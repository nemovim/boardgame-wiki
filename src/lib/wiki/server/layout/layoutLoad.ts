import type { ServerLoadEvent } from '@sveltejs/kit';
import { getRecentWriteLogs } from '@nemowiki/core';

export async function layoutLoad({
	locals
}: ServerLoadEvent): Promise<{ logs: string; user: string; fullTitles: string }> {
	const logs = await getRecentWriteLogs(20);
	return {
		logs: JSON.stringify(logs),
		user: JSON.stringify(locals.user),
		fullTitles: JSON.stringify(locals.fullTitles)
	};
}
