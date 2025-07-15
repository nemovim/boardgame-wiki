<script lang="ts">
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import GrammarBtn from '$lib/wiki/components/common/btns/grammarBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import MoveBtn from '$lib/wiki/components/common/btns/moveBtn.svelte';
	import DeleteBtn from '$lib/wiki/components/common/btns/deleteBtn.svelte';

	let { revision }: { revision: number } = $props();

	const description = $derived(revision + 1 + '번째 수정판');
</script>

{#snippet Btns()}
	<ReadBtn />
	<GrammarBtn />
	<MoveBtn />
	<DeleteBtn />
{/snippet}

<DocHeader {description} {Btns} />
