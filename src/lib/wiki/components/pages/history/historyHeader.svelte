<script lang="ts">
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import BacklinkBtn from '$lib/wiki/components/common/btns/backlinkBtn.svelte';
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';

	const description = '(역사 목록)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<BacklinkBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
