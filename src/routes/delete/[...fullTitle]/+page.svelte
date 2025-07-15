<script lang="ts">
	import DeleteHeader from '$lib/wiki/components/pages/delete/deleteHeader.svelte';
	import DeleteForm from '$lib/wiki/components/pages/delete/deleteForm.svelte';
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';

	let { data } = $props();
</script>

<article>
	<DeleteHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<CommonWarn>파일 문서 삭제 시, 파일도 함께 삭제됩니다.</CommonWarn>
		<DeleteForm />
	{/if}
</article>
