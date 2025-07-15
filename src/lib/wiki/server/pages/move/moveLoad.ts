import { canMove } from '@nemowiki/core/client';
import { getInfoByFullTitle } from '@nemowiki/core';
import type { WikiResponse } from '@nemowiki/core/types';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function moveLoad({ params, locals }: ServerLoadEvent): Promise<WikiResponse<void>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) return { ok: false, reason: 'fullTitle is undefined' };

	const info = await getInfoByFullTitle(fullTitle);

	const res_move = canMove(info, fullTitle, locals.user.group);
	if (!res_move.ok) return res_move;

	return { ok: true };
}
