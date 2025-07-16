<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p><span>[오류]</span> {@render children()}</p>
{/if}

<style lang="scss">
	@use '../../style/common/commonError.scss';
</style>
