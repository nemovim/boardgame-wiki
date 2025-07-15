import { fail, redirect } from '@sveltejs/kit';
import { uploadFileByFullTitle } from '@nemowiki/core';
import { encodeFullTitle, canUploadFile } from '@nemowiki/core/client';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const fileActions = {
	default: async ({ request, locals }: ServerLoadEvent) => {
		const data = await request.formData();
		const markup = (data.get('markup') || '').toString();
		const fullTitle = '파일:' + (data.get('title') || '').toString();
		const file = data.get('file') as File;
		const comment = (data.get('comment') || '').toString();

		const res_file = canUploadFile(fullTitle, file);
		if (!res_file.ok) return fail(400, { message: res_file.reason });

		const res_upload = await uploadFileByFullTitle(fullTitle, markup, file, locals.user, comment);
		if (!res_upload.ok) return fail(400, { message: res_upload.reason });

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}
};
