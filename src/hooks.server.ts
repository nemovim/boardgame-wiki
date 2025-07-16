import * as Sentry from '@sentry/sveltekit';
import type { Handle, HandleServerError, ServerInit } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { WIKI_MONGO_URI, AWS_BUCKET_NAME, AWS_ID, AWS_SECRET } from '$env/static/private';

import { handle as authenticationHandle } from './auth.js';
import {
	activateWiki,
	backupWiki,
	getUserByEmail,
	// signinUserByEmail,
	signupUserByEmailAndName
} from '@nemowiki/core';

import type { User } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';

Sentry.init({
	dsn: 'https://b7fb355f8d1fe0bb052585161dce4a1e@o4509551707160576.ingest.us.sentry.io/4509551708012544',
	tracesSampleRate: 1
});

export const init: ServerInit = async () => {
	if (WIKI_MONGO_URI === undefined) {
		throw new Error('Please set "WIKI_MONGO_URI" in the .env file!');
	}
	if (AWS_BUCKET_NAME === undefined) {
		throw new Error('Please set "AWS_BUCKET_NAME" in the .env file!');
	}
	if (AWS_ID === undefined) {
		throw new Error('Please set "AWS_ID" in the .env file!');
	}
	if (AWS_SECRET === undefined) {
		throw new Error('Please set "AWS_SECRET" in the .env file!');
	}

	await activateWiki(WIKI_MONGO_URI, AWS_BUCKET_NAME, AWS_ID, AWS_SECRET);

	// await backupWiki();
	setInterval(
		() => {
			backupWiki();
		},
		1000 * 60 * 60 * 24 * 7
	); // 7일

	console.log('[Wiki Is Ready]');
};

const authorizationHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	// console.log(`url: ${event.url.pathname} | session: ${!!session?.user}`)
	event.params.fullTitle = (event.params.fullTitle || '').trim();
	event.params.userName = (event.params.userName || '').trim();
	event.params.query = (event.params.query || '').trim();

	if (!event.params.fullTitle && !event.params.userName && !event.params.query) {
		if (!event.url.pathname.startsWith('/f')) redirect(302, '/r/' + encodeFullTitle('위키:대문'));
	}

	if (session?.user?.email) {
		let user: User | null = await getUserByEmail(session.user.email);
		if (user === null) {
			const res = await signupUserByEmailAndName(
				session.user.email,
				session.user.email.split('@')[0]
			);
			if (!res.ok) throw new Error(res.reason);
			user = res.value as User;
		}

		event.locals.user = user;

		// console.log(user);
		return await resolve(event);
	} else {
		// Unauthorized
		const user = { email: null, name: null, group: 'guest', contribCnt: 0 };
		event.locals.user = user;

		// console.log(user);
		return await resolve(event);
	}
};

export const handleError: HandleServerError = Sentry.handleErrorWithSentry(
	async ({ error, event }) => {
		let fullTitle = event.params.fullTitle || event.url.pathname;
		if (event.url.pathname.startsWith('/u')) fullTitle = '사용자:' + event.params.userName;
		if (event.url.pathname.startsWith('/s')) fullTitle = '검색:' + event.params.query;

		return {
			message: error instanceof Error ? error.message : '알 수 없는 에러',
			fullTitle
		};
	}
);

export const handle = sequence(
	Sentry.sentryHandle(),
	sequence(authenticationHandle, authorizationHandle)
);
