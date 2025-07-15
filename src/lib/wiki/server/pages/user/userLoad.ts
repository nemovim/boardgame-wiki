import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';
import { getDocLogsByUserName, getUserByName, refreshAndGetPenaltiesByName } from '@nemowiki/core';

export async function userLoad({
	params,
	url
}: ServerLoadEvent): Promise<
	WikiResponse<{ queriedUser: string; logArr: string; penaltyArr: string }>
> {
	const userName = params.userName;
	if (!userName) {
		return { ok: false, reason: 'userName is undefined' };
	}

	const pageIdx = Number(url.searchParams.get('page')) || 1;

	const queriedUser = await getUserByName(userName);
	if (!queriedUser) return { ok: false, reason: '사용자가 존재하지 않습니다.' };

	const res_penalty = await refreshAndGetPenaltiesByName(userName);
	if (!res_penalty.ok) return res_penalty;

	const res_docLog = await getDocLogsByUserName(userName, pageIdx);
	if (!res_docLog.ok) return res_docLog;

	const value = {
		queriedUser: JSON.stringify(queriedUser),
		logArr: JSON.stringify(res_docLog.value),
		penaltyArr: JSON.stringify(res_penalty.value)
	};

	return { ok: true, value };
}
