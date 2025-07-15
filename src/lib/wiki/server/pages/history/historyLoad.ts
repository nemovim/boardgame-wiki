import { getDocLogsByFullTitle, getInfoByFullTitle } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';
import { canRead } from '@nemowiki/core/client';

export async function historyLoad({
	url,
	params,
	locals
}: ServerLoadEvent): Promise<WikiResponse<{ pageIdx: number; logArr: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) return { ok: false, reason: 'fullTitle is undefined' };

	const pageIdx = Number(url.searchParams.get('page')) || 1;

	const info = await getInfoByFullTitle(fullTitle);
	const res_read = await canRead(info, locals.user.group);
	if (!res_read.ok) return res_read;

	const res_logs = await getDocLogsByFullTitle(fullTitle, pageIdx);
	if (!res_logs.ok) return res_logs;

	if (res_logs.value.length === 0) return { ok: false, reason: '역사가 존재하지 않습니다.' };

	return { ok: true, value: { pageIdx, logArr: JSON.stringify(res_logs.value) } };
}
