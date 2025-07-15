<script lang="ts">
	import { page } from '$app/state';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import type { Snippet } from 'svelte';
	import CommonHeader from '../commonHeader.svelte';

	let {
		Btns,
		description
	}: {
		Btns: Snippet;
		description?: string;
	} = $props();

	const fullTitle = $derived(page.params.fullTitle);
</script>

<CommonHeader {description} {Btns}>
	<a href="/r/{encodeFullTitle(fullTitle)}">{fullTitle}</a>
</CommonHeader>

<style lang="scss">
	@use '../../../style/common/docHeader.scss';
</style>
