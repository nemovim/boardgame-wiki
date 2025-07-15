import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';
import { getUserByName, refreshAndGetPenaltiesByName } from '@nemowiki/core';

export async function penaltyLoad({
	params
}: ServerLoadEvent): Promise<WikiResponse<{ queriedUser: string; penaltyArr: string }>> {
	const userName = params.userName;
	if (!userName) return { ok: false, reason: 'userName is undefined' };

	const queriedUser = await getUserByName(userName);
	if (!queriedUser) return { ok: false, reason: '사용자가 존재하지 않습니다.' };

	const res_penalty = await refreshAndGetPenaltiesByName(userName);

	if (!res_penalty.ok) return res_penalty;

	return {
		ok: true,
		value: {
			queriedUser: JSON.stringify(queriedUser),
			penaltyArr: JSON.stringify(res_penalty.value)
		}
	};
}
