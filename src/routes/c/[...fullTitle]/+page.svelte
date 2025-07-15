<script lang="ts">
	import type { Change } from '@nemowiki/core/types';
	import CompareModule from '$lib/wiki/components/pages/compare/compareModule.svelte';
	import CompareHeader from '$lib/wiki/components/pages/compare/compareHeader.svelte';

	let { data } = $props();

	let diff = $derived<Change[] | null>(JSON.parse(data?.value?.diff || 'null'));
	let oldRev = $derived<number>(data?.value?.oldRev as number);
	let newRev = $derived<number>(data?.value?.newRev as number);
</script>

<article>
	<CompareHeader {oldRev} {newRev} />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<CompareModule {diff} />
	{/if}
</article>
