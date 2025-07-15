import { getInfoByFullTitle, deleteDocByFullTitle } from '@nemowiki/core';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { canDelete, encodeFullTitle } from '@nemowiki/core/client';

export const deleteActions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) return fail(400, { message: 'fullTitle is undefined' });

		const data = await request.formData();
		const comment = (data.get('comment') || '').toString();

		const info = await getInfoByFullTitle(fullTitle);

		let res = canDelete(info, locals.user.group);
		if (!res.ok) return fail(400, { message: res.reason });

		res = await deleteDocByFullTitle(fullTitle, locals.user, comment);
		if (!res.ok) return fail(400, { message: res.reason });

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}
} satisfies Actions;
