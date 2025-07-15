<script lang="ts">
	import type { SearchResult } from '@nemowiki/core/types';

	import SearchHeader from '$lib/wiki/components/pages/search/searchHeader.svelte';
	import SearchResults from '$lib/wiki/components/pages/search/searchResults.svelte';

	let { data } = $props();

	let resultArr = $derived<Array<SearchResult>>(JSON.parse(data?.value?.result || '[]'));
</script>

<article>
	<SearchHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<SearchResults {resultArr} />
	{/if}
</article>
