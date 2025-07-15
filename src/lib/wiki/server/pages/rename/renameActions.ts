import { changeUserNameByName } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const renameActions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const newName = (data.get('new-name') || '').toString();
		if (!newName) return fail(400, { message: 'newName is undefined' });

		const res = await changeUserNameByName(locals.user.name, newName, locals.user);

		if (res.ok) redirect(303, '/u/' + encodeFullTitle(newName));
		else return fail(400, { message: res.reason });
	}
} satisfies Actions;
