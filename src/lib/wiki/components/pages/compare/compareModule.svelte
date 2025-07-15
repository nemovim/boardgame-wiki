<script lang="ts">
	import type { Change } from '@nemowiki/core/types';
	let { diff }: { diff: Change[] | null } = $props();

	// function parseWhiteSpaces(content: string): string {
	//     return content.replaceAll('\n', '<br>');
	// }
</script>

<div id="compare-div">
	{#if diff === null}
		<p>존재하지 않는 문서입니다.</p>
	{:else}
		<p>
			{#each diff as part, i (i)}
				{#if part.added}
					<span class="added">{part.value}</span>
				{:else if part.removed}
					<span class="removed">{part.value}</span>
				{:else}
					{part.value}
				{/if}
			{/each}
		</p>
	{/if}
</div>

<style lang="scss">
	@use '../../../style/pages/compare/compareModule.scss';
</style>
