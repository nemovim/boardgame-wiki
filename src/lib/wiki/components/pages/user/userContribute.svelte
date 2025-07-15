<script lang="ts">
	import { page } from '$app/state';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import LogList from '$lib/wiki/components/common/logList.svelte';
	import { goto } from '$app/navigation';

	const cntPerPage = 10;

	let pageIdx = $state<number>(Number(page.url.searchParams.get('page')) || 1);

	let { queriedUser, logArr } = $props();

	async function gotoOtherPage(loadType: 'prev' | 'next') {
		if (loadType === 'prev' && pageIdx > 1) {
			pageIdx -= 1;
		} else if (loadType === 'next' && pageIdx * cntPerPage < queriedUser.contribCnt) {
			pageIdx += 1;
		}

		if (pageIdx < 1) pageIdx = 1;
		if (pageIdx * cntPerPage > queriedUser.contribCnt)
			pageIdx = Math.ceil(queriedUser.contribCnt / cntPerPage);

		goto(`/u/${encodeFullTitle(queriedUser.name)}?page=${pageIdx}`);
	}
</script>

{#snippet PrevPageBtn()}
	<button disabled={pageIdx === 1} onclick={() => gotoOtherPage('prev')}>이전</button>
{/snippet}

{#snippet NextPageBtn()}
	<button
		disabled={pageIdx * cntPerPage >= queriedUser.contribCnt}
		onclick={() => gotoOtherPage('next')}>다음</button
	>
{/snippet}

<div id="user-contribute-div">
	<h3>기여 내역</h3>
	{#if logArr.length === 0}
		<p>기여 내역이 없습니다.</p>
	{:else}
		<LogList {logArr} pageType="user" />
		{@render PrevPageBtn()}
		{@render NextPageBtn()}
	{/if}
</div>

<style lang="scss">
	@use '../../../style/pages/user/userContribute.scss';
</style>
