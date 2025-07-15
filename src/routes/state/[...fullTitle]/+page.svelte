<script lang="ts">
	import StateHeader from '$lib/wiki/components/pages/state/stateHeader.svelte';
	import StateForm from '$lib/wiki/components/pages/state/stateForm.svelte';

	let { data } = $props();
</script>

<article>
	<StateHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<StateForm info={JSON.parse(data.value.info)} />
	{/if}
</article>
