import { getInfoByFullTitle } from '@nemowiki/core';
import { canRead } from '@nemowiki/core/client';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';

export async function authorityLoad({
	params,
	locals
}: ServerLoadEvent): Promise<WikiResponse<{ info: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) return { ok: false, reason: 'fullTitle is undefined' };

	const info = await getInfoByFullTitle(fullTitle);

	const res_read = canRead(info, locals.user.group);
	if (!res_read.ok) return res_read;

	return {
		ok: true,
		value: {
			info: JSON.stringify(info)
		}
	};
}
