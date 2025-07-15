<script lang="ts">
	import MoveHeader from '$lib/wiki/components/pages/move/moveHeader.svelte';
	import MoveForm from '$lib/wiki/components/pages/move/moveForm.svelte';

	let { data } = $props();
</script>

<article>
	<MoveHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<MoveForm />
	{/if}
</article>
