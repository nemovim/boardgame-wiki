<script lang="ts">
	import DocHeader from '$lib/wiki/components/common/headers/docHeader.svelte';
	import AuthorityBtn from '$lib/wiki/components/common/btns/authorityBtn.svelte';

	const description = '(문서 상태 변경)';
</script>

{#snippet Btns()}
	<AuthorityBtn />
{/snippet}

<DocHeader {description} {Btns} />
