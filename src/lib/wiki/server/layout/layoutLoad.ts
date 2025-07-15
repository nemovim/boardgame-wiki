import { getRecentWriteLogs, getAllFullTitles } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function layoutLoad({
	locals
}: ServerLoadEvent): Promise<{ logs: string; user: string; fullTitles: string }> {
	const logs = await getRecentWriteLogs(20);
	const fullTitles = await getAllFullTitles();
	return {
		logs: JSON.stringify(logs),
		user: JSON.stringify(locals.user),
		fullTitles: JSON.stringify(fullTitles)
	};
}
