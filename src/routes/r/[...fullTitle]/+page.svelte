<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import { page } from '$app/state';

	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';
	import CommonInfo from '$lib/wiki/components/common/commonInfo.svelte';
	import ReadHeader from '$lib/wiki/components/pages/read/readHeader.svelte';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';

	let { data } = $props();

	let rev = $derived<number | null>(Number(page.url.searchParams.get('rev')||'-1') || -1);
	let from = $derived<string | null>(page.url.searchParams.get('from'));
	let doc = $derived<Doc | null>(JSON.parse(data?.value?.doc || 'null'));

	let html = $derived<string>(doc?.html || '');
</script>

<article>
	<ReadHeader revision={doc?.revision || 0} />
	{#if from}
		<CommonInfo><a href="/r/{from}?redirect=no">{from}</a>에서 넘어옴.</CommonInfo>
	{/if}
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		{#if rev !== -1}
			<CommonWarn>이 문서는 <b>{rev}</b>번째 수정판임에 유의하세요.</CommonWarn>
		{/if}
		<HtmlContent content={html} />
	{/if}
</article>
