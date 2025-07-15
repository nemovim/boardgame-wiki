<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { SearchResult } from '@nemowiki/core/types';
	import { page } from '$app/state';

	let { resultArr }: { resultArr: Array<SearchResult> } = $props();

	const query = $derived<string>(page.params.query);

	function readDoc(_fullTitle: string): void {
		goto(`/r/${encodeFullTitle(_fullTitle)}`);
	}

	function writeDoc(_fullTitle: string): void {
		goto(`/w/${encodeFullTitle(_fullTitle)}`);
	}
</script>

{#snippet newDocBtn()}
	<button id="new-doc-btn" onclick={() => writeDoc(query)}>
		"{query}" 문서를 생성하시겠습니까?
	</button>
{/snippet}

{#snippet ResultBtns()}
	{#each resultArr as result (result.original)}
		<button onclick={() => readDoc(result.original)}>
			{result.original}
		</button>
	{/each}
{/snippet}

<div id="search-results-div">
	{@render newDocBtn()}
	{@render ResultBtns()}
</div>

<style lang="scss">
	@use '../../../style/pages/search/searchResults.scss';
</style>
