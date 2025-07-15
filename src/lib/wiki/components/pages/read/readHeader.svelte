<script lang="ts">
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';

	let { revision }: { revision: number } = $props();

	const description = $derived(revision + '번째 수정판');
</script>

{#snippet Btns()}
	<WriteBtn />
	<HistoryBtn />
	<BacklinkBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
