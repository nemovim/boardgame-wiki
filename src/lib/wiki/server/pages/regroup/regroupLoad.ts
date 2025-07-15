import { canChangeGroup } from '@nemowiki/core/client';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';
import { getUserByName } from '@nemowiki/core';

export async function regroupLoad({
	params,
	locals
}: ServerLoadEvent): Promise<WikiResponse<void>> {
	const userName = params.userName;
	if (!userName) return { ok: false, reason: 'userName is undefined' };

	const queriedUser = await getUserByName(userName);
	if (!queriedUser) return { ok: false, reason: 'user is undefined' };

	return canChangeGroup(queriedUser, locals.user.group);
}
