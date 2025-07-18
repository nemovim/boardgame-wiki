<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
</script>

<header class="container">
	<h1><a href="/r/위키:대문"><span>보드게임 위키</span></a></h1>
	<SearchModule />
	<UploadModule />
</header>

<style lang="scss">
	@use '../../style/layout/headerModule.scss';
</style>
