import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';
import { getInfoByFullTitle } from '@nemowiki/core';
import { canHide, canShow } from '@nemowiki/core/client';

export async function stateLoad({
	params,
	locals
}: ServerLoadEvent): Promise<WikiResponse<{ info: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) return { ok: false, reason: 'fullTitle is undefined' };

	const info = await getInfoByFullTitle(fullTitle);

	if (info?.state === 'hidden') {
		const res = canShow(info, locals.user.group);
		if (!res.ok) return res;
	} else {
		const res = canHide(info, locals.user.group);
		if (!res.ok) return res;
	}

	return {
		ok: true,
		value: {
			info: JSON.stringify(info)
		}
	};
}
