<script lang="ts">
	import type { DocLogDoc } from '@nemowiki/core/types';
	import HistoryList from '$lib/wiki/components/pages/history/historyList.svelte';
	import HistoryHeader from '$lib/wiki/components/pages/history/historyHeader.svelte';

	let { data } = $props();

	let logArr = $derived<DocLogDoc[]>(JSON.parse(data?.value?.logArr || '[]'));
</script>

<article>
	<HistoryHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<HistoryList {logArr} />
	{/if}
</article>
