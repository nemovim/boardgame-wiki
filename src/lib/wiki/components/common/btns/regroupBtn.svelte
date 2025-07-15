<script lang="ts">
	import { page } from '$app/state';
	import CommonBtn from '../commonBtn.svelte';

	const userGroup = $derived(JSON.parse(page.data.user).group);
</script>

{#if ['dev', 'manager'].includes(userGroup)}
	<CommonBtn btnName="그룹 변경" pageName="regroup" />
{/if}
