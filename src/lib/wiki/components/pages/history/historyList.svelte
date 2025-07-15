<script lang="ts">
	import { page } from '$app/state';
	import LogList from '$lib/wiki/components/common/logList.svelte';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { goto } from '$app/navigation';

	const fullTitle = $derived<string>(page.params.fullTitle);

	let { logArr } = $props();

	let pageIdx = $state<number>(Number(page.url.searchParams.get('page')) || 1);
	let loading = $state<boolean>(false);

	async function loadMoreLogs(loadType: 'prev' | 'next') {
		loading = true;

		if (loadType === 'prev') {
			pageIdx -= 1;
		} else if (loadType === 'next') {
			pageIdx += 1;
		}

		await goto(`/h/${encodeFullTitle(fullTitle)}?page=${pageIdx}`);

		loading = false;
	}
</script>

{#snippet PrevBtn()}
	<button disabled={loading || pageIdx === 1} onclick={() => loadMoreLogs('prev')}>이전</button>
{/snippet}

{#snippet NextBtn()}
	<button
		disabled={loading || (logArr.at(-1)?.revision === 1 && logArr.at(-1)?.action === 'create')}
		onclick={() => loadMoreLogs('next')}>다음</button
	>
{/snippet}

<div id="history-list-div">
	<LogList {logArr} pageType="hist" />
	{@render PrevBtn()}
	{@render NextBtn()}
</div>

<style lang="scss">
	@use '../../../style/pages/history/historyList.scss';
</style>
