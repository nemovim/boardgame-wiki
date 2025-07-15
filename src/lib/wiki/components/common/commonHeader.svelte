<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, description, Btns }: { children: Snippet; description?: string; Btns?: Snippet } =
		$props();
</script>

{#snippet TitleDiv()}
	<div id="title-div">
		<h1 id="doc-title">{@render children()}</h1>
		{#if description}
			<span id="doc-description">{description}</span>
		{/if}
	</div>
{/snippet}

{#snippet BtnNav()}
	<nav>
		{#if Btns}
			{@render Btns()}
		{/if}
	</nav>
{/snippet}

<header>
	{@render TitleDiv()}
	{@render BtnNav()}
</header>

<style lang="scss">
	@use '../../style/common/commonHeader.scss';
</style>
