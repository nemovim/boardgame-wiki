import { canDelete } from '@nemowiki/core/client';
import { getInfoByFullTitle } from '@nemowiki/core';
import type { WikiResponse } from '@nemowiki/core/types';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function deleteLoad({ params, locals }: ServerLoadEvent): Promise<WikiResponse<void>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle)
		return {
			ok: false,
			reason: 'fullTitle is undefined'
		};

	const info = await getInfoByFullTitle(fullTitle);

	const res_delete = canDelete(info, locals.user.group);
	if (!res_delete.ok) return res_delete;

	return {
		ok: true
	};
}
