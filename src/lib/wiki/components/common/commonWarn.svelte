<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p><span>[주의]</span> {@render children()}</p>
{/if}

<style lang="scss">
	@use '../../style/common/commonWarn.scss';
</style>
