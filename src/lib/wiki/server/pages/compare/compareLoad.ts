import { compareDocByDoc, getInfoByFullTitle, getDocByFullTitle } from '@nemowiki/core';
import { canRead } from '@nemowiki/core/client';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';

export async function compareLoad({
	params,
	url,
	locals
}: ServerLoadEvent): Promise<WikiResponse<{ diff: string; oldRev: number; newRev: number }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) return { ok: false, reason: 'fullTitle is undefined' };

	const oldRev = Number(url.searchParams.get('old'));
	const newRev = Number(url.searchParams.get('new'));

	if (oldRev < 0 || newRev <= 0) return { ok: false, reason: 'oldRev or newRev is invalid' };

	const info = await getInfoByFullTitle(fullTitle);

	const res_read = canRead(info, locals.user.group);
	if (!res_read.ok) return res_read;

	const oldDoc = await getDocByFullTitle(fullTitle, oldRev);
	const newDoc = await getDocByFullTitle(fullTitle, newRev);

	if (oldDoc?.state === 'new') oldDoc.markup = '';
	if (newDoc?.state === 'new') newDoc.markup = '';

	const res_compare = await compareDocByDoc(oldDoc, newDoc);
	const value = {
		diff: JSON.stringify(res_compare.value),
		oldRev,
		newRev
	};

	return { ok: true, value };
}
