<script lang="ts">
	import { goto } from '$app/navigation';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { page } from '$app/state';

	let { pageName, btnName }: { pageName: string; btnName: string } = $props();

	let slug = $derived(page.params.fullTitle || page.params.userName || page.params.query);

	function gotoPage(): void {
		goto(`/${pageName}/${encodeFullTitle(slug)}`);
	}
</script>

<button class="{pageName}-btn" onclick={gotoPage}>{btnName}</button>

<style lang="scss">
	@use '../../style/common/commonBtn.scss';
</style>
