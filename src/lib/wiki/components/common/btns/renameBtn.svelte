<script lang="ts">
	import CommonBtn from '../commonBtn.svelte';
	import { page } from '$app/state';
	const userName = $derived(JSON.parse(page.data.user).name);
</script>

{#if userName === page.params.userName}
	<CommonBtn pageName="rename" btnName="이름 변경" />
{/if}
