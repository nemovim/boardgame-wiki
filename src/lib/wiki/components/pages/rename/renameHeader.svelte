<script lang="ts">
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';
	import RegroupBtn from '$lib/wiki/components/common/btns/regroupBtn.svelte';
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';

	const description = '(이름 변경)';
</script>

{#snippet Btns()}
	<RegroupBtn />
	<PenaltyBtn />
{/snippet}

<UserHeader {description} {Btns} />
