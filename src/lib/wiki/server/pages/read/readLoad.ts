import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

import type { WikiResponse } from '@nemowiki/core/types';
import { getRedirectFullTitleByMarkup, readDocByFullTitle } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';

import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';

export async function readLoad({
	params,
	locals,
	url
}: ServerLoadEvent): Promise<WikiResponse<{ doc: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle)
		return {
			ok: false,
			reason: 'fullTitle is undefined'
		};

	const rev = Number(url.searchParams.get('rev')||'-1');

	const res_read = await readDocByFullTitle(fullTitle, locals.user, rev);
	if (!res_read.ok) return res_read;

	const doRedirect = url.searchParams.get('redirect');
	const redirectFullTitle = getRedirectFullTitleByMarkup(res_read.value.markup || '');

	if (redirectFullTitle && doRedirect !== 'no' && rev === -1) {
		redirect(303, `/r/${encodeFullTitle(redirectFullTitle)}?from=${encodeFullTitle(fullTitle)}`);
	}

	res_read.value.html = modifyHtmlByExistenceOfLinks(res_read.value.html || '', locals.fullTitles);

	return {
		ok: true,
		value: { doc: JSON.stringify(res_read.value) }
	};
}
