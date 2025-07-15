import { changeUserGroupByName } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const regroupActions = {
	default: async ({ request, locals, params }) => {
		const queriedUserName = params.userName;
		if (!queriedUserName) return fail(400, { message: 'queriedUserName is undefined' });

		const data = await request.formData();
		const newGroup = (data.get('new-group') || '').toString();
		if (!newGroup) return fail(400, { message: 'newGroup is undefined' });

		const res = await changeUserGroupByName(queriedUserName, newGroup, locals.user);

		if (res.ok) redirect(303, '/u/' + encodeFullTitle(queriedUserName));
		else return fail(400, { message: res.reason });
	}
} satisfies Actions;
