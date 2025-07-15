<script lang="ts">
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import ReadBtn from '$lib/wiki/components/common/btns/readBtn.svelte';
	import WriteBtn from '$lib/wiki/components/common/btns/writeBtn.svelte';
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';

	const description = '(문서 이동)';
</script>

{#snippet Btns()}
	<ReadBtn />
	<WriteBtn />
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
