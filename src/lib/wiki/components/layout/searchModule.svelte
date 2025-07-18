<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import HangulSearcher from 'hangul-searcher';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import Search from '@lucide/svelte/icons/search';

	let searchWord = $state<string>('');

	let fullTitleArr = $derived<string[]>(JSON.parse(page.data.fullTitles));

	let hangulSearcher = $derived(new HangulSearcher(fullTitleArr));

	let suggestionArr = $state<any[]>([]);

	function suggest(title: string): void {
		suggestionArr = hangulSearcher.autoComplete(title);
	}

	function checkEnter(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			search(searchWord);
		}
	}

	function search(title: string): void {
		goto(`/s/${encodeFullTitle(title)}`);
	}

	function readDoc(title: string): void {
		goto(`/r/${encodeFullTitle(title)}`);
	}

	function onBlurSearchDiv(e: FocusEvent): void {
		if (e.target !== null && e.relatedTarget instanceof HTMLElement) {
			if (e.relatedTarget.classList.contains('suggestion-btn')) {
				e.relatedTarget.click();
			} else {
				suggestionArr = [];
			}
		} else {
			suggestionArr = [];
		}
	}

	onNavigate(() => {
		suggestionArr = [];
		searchWord = '';
	});
</script>

{#snippet SearchInput()}
	<input
		id="keyword-input"
		type="text"
		onfocus={() => suggest('')}
		onblur={onBlurSearchDiv}
		oninput={() => suggest(searchWord)}
		onkeydown={checkEnter}
		bind:value={searchWord}
		autocomplete="off"
		aria-label="search input"
	/>
{/snippet}

{#snippet SearchButton()}
	<button id="search-btn" class="container" onclick={() => search(searchWord)}>
		<Search size="1.25rem" />
	</button>
{/snippet}

{#snippet SuggestionBtn(suggestion: string, i: number)}
	<button
		onclick={() => readDoc(suggestion)}
		class="suggestion-btn"
		style="top: {(i + 1)*2 + 0.5}rem"
	>
		{suggestion}</button
	>
{/snippet}

<div id="search-div" class="container">
	{@render SearchInput()}
	{@render SearchButton()}

	{#each suggestionArr as suggestion, i (suggestion)}
		{#if i <= 8}
			{@render SuggestionBtn(suggestion, i)}
		{/if}
	{/each}
</div>

<style lang="scss">
	@use '../../style/layout/searchModule.scss';
</style>
