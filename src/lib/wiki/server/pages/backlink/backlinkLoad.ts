import { createBacklinkHtmlByFullTitle } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';

export async function backlinkLoad({
	params
}: ServerLoadEvent): Promise<WikiResponse<{ html: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) return { ok: false, reason: 'fullTitle is undefined' };

	const html = await createBacklinkHtmlByFullTitle(fullTitle);

	if (!html) return { ok: false, reason: '역링크가 존재하지 않습니다.' };

	return { ok: true, value: { html } };
}
