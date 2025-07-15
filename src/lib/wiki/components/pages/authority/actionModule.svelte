<script lang="ts">
	import type { DocAction, Info } from '@nemowiki/core/types';
	import { docActionArr, translatedDocActionArr } from '$lib/wiki/utils/general.js';

	let { docAction, info }: { docAction: DocAction; info: Info } = $props();
</script>

<div class="action-div">
	<div>
		<span class="action-span">[{translatedDocActionArr[docActionArr.indexOf(docAction)]}]</span>
		<span>
			{#if info.authority?.[docAction]}
				{info.authority[docAction]}
			{:else}
				none
			{/if}
		</span>
	</div>
</div>
<hr />

<style lang="scss">
	@use '../../../style/pages/authority/actionModule.scss';
</style>
