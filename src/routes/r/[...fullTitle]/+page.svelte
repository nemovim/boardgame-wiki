<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';

	import ReadHeader from '$lib/wiki/components/pages/read/readHeader.svelte';
	import ReadCaution from '$lib/wiki/components/pages/read/readCaution.svelte';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';

	let { data } = $props();

	let rev = $derived<number>(data?.value?.rev as number);
	let doc = $derived<Doc | null>(JSON.parse(data?.value?.doc || 'null'));

	let html = $derived<string>(doc?.html || '');
</script>

<article>
	<ReadHeader revision={doc?.revision || 0} />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<ReadCaution ok={data.ok} {rev} />
		<HtmlContent content={html} />
	{/if}
</article>
