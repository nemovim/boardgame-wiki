import { getInfoByFullTitle, moveDocByFullTitle } from '@nemowiki/core';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { canMove, encodeFullTitle } from '@nemowiki/core/client';

export const moveActions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle)
			return fail(400, {
				message: 'fullTitle is undefined'
			});

		const data = await request.formData();
		const newFullTitle = (data.get('new-full-title') || '').toString();
		const comment = (data.get('comment') || '').toString();

		const info = await getInfoByFullTitle(fullTitle);

		let res = canMove(info, newFullTitle, locals.user.group);
		if (!res.ok) return fail(400, { message: res.reason });

		res = await moveDocByFullTitle(fullTitle, newFullTitle, comment);
		if (!res.ok) return fail(400, { message: res.reason });

		redirect(303, `/r/${encodeFullTitle(newFullTitle)}`);
	}
} satisfies Actions;
