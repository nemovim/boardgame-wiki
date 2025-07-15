<script lang="ts">
	import { docActionArr } from '$lib/wiki/utils/general.js';
	import AuthorityGroupList from './actionModule.svelte';
	import type { Info } from '@nemowiki/core/types';

	let { info }: { info: Info } = $props();
</script>

{#each docActionArr as docAction (docAction)}
	<AuthorityGroupList {docAction} {info} />
{/each}

<style lang="scss">
	@use '../../../style/pages/authority/authorityList.scss';
</style>
