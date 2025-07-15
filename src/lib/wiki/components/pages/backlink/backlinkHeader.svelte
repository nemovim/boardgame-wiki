<script lang="ts">
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import HistoryBtn from '$lib/wiki/components/common/btns/historyBtn.svelte';

	const description = '(역링크 목록)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<HistoryBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
