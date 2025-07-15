<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import WriteHeader from '$lib/wiki/components/pages/write/writeHeader.svelte';
	import WriteForm from '$lib/wiki/components/pages/write/writeForm.svelte';

	let { data } = $props();

	let doc = $derived<Doc | null>(JSON.parse(data?.value?.doc || 'null'));
</script>

<article>
	<WriteHeader revision={doc?.revision || 0} />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<WriteForm {doc} />
	{/if}
</article>
