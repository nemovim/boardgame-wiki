<script lang="ts">
	import RegroupHeader from '$lib/wiki/components/pages/regroup/regroupHeader.svelte';
	import RegroupForm from '$lib/wiki/components/pages/regroup/regroupForm.svelte';

	let { data } = $props();
</script>

<article>
	<RegroupHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<RegroupForm />
	{/if}
</article>
