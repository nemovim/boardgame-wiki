import { canCreate, canEdit } from '@nemowiki/core/client';
import { getDocByFullTitle, getEmptyDocByFullTitle } from '@nemowiki/core';
import type { WikiResponse } from '@nemowiki/core/types';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function writeLoad({
	params,
	locals
}: ServerLoadEvent): Promise<WikiResponse<{ doc: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle)
		return {
			ok: false,
			reason: 'fullTitle is undefined'
		};

	let doc = await getDocByFullTitle(fullTitle, -1);
	let res: WikiResponse<void>;

	if (doc === null) {
		// New document
		res = canCreate(null, fullTitle, locals.user.group);
		doc = getEmptyDocByFullTitle(fullTitle);
	} else if (doc.state === 'deleted' || doc.state === 'hidden') {
		res = canCreate(doc, fullTitle, locals.user.group);
	} else {
		res = canEdit(doc, locals.user.group);
	}

	if (!res.ok) return res;

	return {
		ok: true,
		value: {
			doc: JSON.stringify(doc)
		}
	};
}
