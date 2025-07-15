import { blockUserByName, removePenaltyById, warnUserByName } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import type { WikiResponse } from '@nemowiki/core/types';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const penaltyActions = {
	apply: async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) return fail(400, { message: 'userName is undefined' });

		const data = await request.formData();
		const penaltyType = (data.get('penalty-type') || '').toString();
		if (!penaltyType) return fail(400, { message: 'penaltyType is undefined' });
		const duration = (data.get('duration') || '').toString();
		if (!duration) return fail(400, { message: '기간을 입력해 주세요.' });
		const reason = (data.get('reason') || '').toString();
		if (!reason) return fail(400, { message: '사유를 입력해 주세요.' });

		let res: WikiResponse<void>;
		if (penaltyType === 'warn') {
			res = await warnUserByName(userName, locals.user, Number(duration), reason);
		} else if (penaltyType === 'block') {
			res = await blockUserByName(userName, locals.user, Number(duration), reason);
		} else {
			return fail(400, { message: 'penaltyType is invalid' });
		}

		if (res.ok) redirect(303, '/u/' + encodeFullTitle(userName));
		else return fail(400, { message: res.reason });
	},
	remove: async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) return fail(400, { message: 'userName is undefined' });

		const data = await request.formData();
		const penaltyId = (data.get('penalty-id') || '').toString();
		if (!penaltyId) return fail(400, { message: 'penaltyId is undefined' });
		const reason = (data.get('reason') || '').toString();
		if (!reason) return fail(400, { message: '이유를 입력해 주세요.' });

		const res: WikiResponse<void> = await removePenaltyById(penaltyId, reason, locals.user);
		if (res.ok) redirect(303, '/u/' + encodeFullTitle(userName));
		else return fail(400, { message: res.reason });
	}
} satisfies Actions;
