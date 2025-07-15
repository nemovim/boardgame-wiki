<script lang="ts">
	import BacklinkHeader from '$lib/wiki/components/pages/backlink/backlinkHeader.svelte';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';

	let { data } = $props();

	let html = $derived<string>(data?.value?.html || '');
</script>

<article>
	<BacklinkHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<HtmlContent content={html} />
	{/if}
</article>
