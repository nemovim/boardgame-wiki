<script lang="ts">
	import { type Info } from '@nemowiki/core/types';
	import AuthorityHeader from '$lib/wiki/components/pages/authority/authorityHeader.svelte';
	import AuthorityForm from '$lib/wiki/components/pages/authority/authorityForm.svelte';
	import AuthorityList from '$lib/wiki/components/pages/authority/authorityList.svelte';

	let { data } = $props();

	let info = $derived<Info | null>(JSON.parse(data?.value?.info || 'null'));
</script>

<article>
	<AuthorityHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else if info}
		<section>
			<AuthorityList {info} />
		</section>
		<section>
			<AuthorityForm {info} />
		</section>
	{/if}
</article>
