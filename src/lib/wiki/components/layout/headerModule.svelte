<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
	// import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
</script>

<header class="container">
	<h1><a href="/r/위키:대문"><span>보드게임 위키</span></a></h1>
	<!-- <EllipsisVertical size="1.5rem" style="margin: 0 1rem" /> -->
	<!-- <EllipsisVertical size="1.5rem" style="margin: 0 1rem" /> -->
	<SearchModule />
	<UploadModule />
</header>

<style lang="scss">
	@use '../../style/layout/headerModule.scss';
</style>
