<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<p><span>[알림]</span> {@render children()}</p>
{/if}

<style lang="scss">
	@use '../../style/common/commonInfo.scss';
</style>
