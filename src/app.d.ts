// See https://svelte.dev/docs/kit/types#app.d.ts
import type { User, DocLog } from '@nemowiki/core/types';
import type { RequestEvent } from '@sveltejs/kit';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: User;
			auth: RequestEvent['locals']['auth'];
			logs: DocLog[];
			fullTitles: string[];
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
