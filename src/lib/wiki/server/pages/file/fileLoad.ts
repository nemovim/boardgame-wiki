import { getEmptyDocByFullTitle } from '@nemowiki/core';
import type { WikiResponse } from '@nemowiki/core/types';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function fileLoad(_: ServerLoadEvent): Promise<WikiResponse<{ boilerplate: string }>> {
	const doc = getEmptyDocByFullTitle('파일:임시');
	return {
		ok: true,
		value: {
			boilerplate: doc.markup
		}
	};
}
