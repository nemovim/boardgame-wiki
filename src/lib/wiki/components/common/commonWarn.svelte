<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p>{@render children()}</p>
{/if}

<style lang="scss">
	@use '../../style/common/commonWarn.scss';
</style>
