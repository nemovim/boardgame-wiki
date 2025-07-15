import { getInfoByFullTitle, changeAuthorityByFullTitle } from '@nemowiki/core';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { canChangeAuthority, encodeFullTitle } from '@nemowiki/core/client';
import type { Group } from '@nemowiki/core/types';

export const authorityActions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle)
			return fail(400, {
				message: 'fullTitle is undefined'
			});

		const data = await request.formData();
		const docAction = (data.get('doc-action') || '').toString();
		const groupPrompt = (data.get('group') || '').toString();

		const info = await getInfoByFullTitle(fullTitle);

		const newGroupArr = groupPrompt.trim().split(/ *, */) as Group[];

		let res = canChangeAuthority(info, newGroupArr, locals.user.group);
		if (!res.ok) return fail(400, { message: res.reason });

		res = await changeAuthorityByFullTitle(fullTitle, docAction, newGroupArr, locals.user);
		if (!res.ok) return fail(400, { message: res.reason });

		redirect(303, `/a/${encodeFullTitle(fullTitle)}`);
	}
} satisfies Actions;
