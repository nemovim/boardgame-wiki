import { readDocByFullTitle } from '@nemowiki/core';
import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';

export async function readLoad({
	params,
	locals,
	url,
	parent
}: ServerLoadEvent): Promise<WikiResponse<{ doc: string; rev: number }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle)
		return {
			ok: false,
			reason: 'fullTitle is undefined'
		};

	let rev = Number(url.searchParams.get('rev'));
	if (rev === 0) rev = -1;

	const res_read = await readDocByFullTitle(fullTitle, locals.user, rev);
	if (!res_read.ok) return res_read;

	res_read.value.html = modifyHtmlByExistenceOfLinks(
		res_read.value.html || '',
		JSON.parse((await parent()).fullTitles)
	);

	return {
		ok: true,
		value: {
			rev,
			doc: JSON.stringify(res_read.value)
		}
	};
}
