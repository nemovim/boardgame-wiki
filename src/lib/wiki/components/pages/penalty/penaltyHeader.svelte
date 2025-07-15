<script lang="ts">
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';
	import UserBtn from '$lib/wiki/components/common/btns/userBtn.svelte';
	import RenameBtn from '../../common/btns/renameBtn.svelte';

	const description = '(경고 및 차단)';
</script>

{#snippet Btns()}
	<UserBtn />
	<RenameBtn />
{/snippet}

<UserHeader {description} {Btns} />
