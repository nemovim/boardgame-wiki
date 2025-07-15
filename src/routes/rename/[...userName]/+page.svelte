<script lang="ts">
	import RenameHeader from '$lib/wiki/components/pages/rename/renameHeader.svelte';
	import RenameForm from '$lib/wiki/components/pages/rename/renameForm.svelte';
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';

	let { data } = $props();
</script>

<article>
	<RenameHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<CommonWarn>변경 시 30일 동안 재변경이 불가합니다.</CommonWarn>
		<RenameForm />
	{/if}
</article>
