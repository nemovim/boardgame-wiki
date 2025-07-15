<script lang="ts">
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';
	import RenameBtn from '$lib/wiki/components/common/btns/renameBtn.svelte';
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';
	import UserBtn from '../../common/btns/userBtn.svelte';

	const description = '(그룹 변경)';
</script>

{#snippet Btns()}
	<UserBtn />
	<RenameBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} {Btns} />
