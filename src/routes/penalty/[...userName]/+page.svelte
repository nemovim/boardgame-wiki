<script lang="ts">
	import PenaltyHeader from '$lib/wiki/components/pages/penalty/penaltyHeader.svelte';
	import UserPenalty from '$lib/wiki/components/pages/user/userPenalty.svelte';
	import type { PenaltyDoc } from '@nemowiki/core/types';
	import ApplyPenaltyForm from '$lib/wiki/components/pages/penalty/applyPenaltyForm.svelte';
	import RemovePenaltyForm from '$lib/wiki/components/pages/penalty/removePenaltyForm.svelte';

	let { data } = $props();

	const penaltyArr = $derived<PenaltyDoc[]>(JSON.parse(data?.value?.penaltyArr || '[]'));
</script>

<article>
	<PenaltyHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<UserPenalty {penaltyArr} />
		<RemovePenaltyForm {penaltyArr} />
		<ApplyPenaltyForm />
	{/if}
</article>
