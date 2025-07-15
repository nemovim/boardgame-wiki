<script lang="ts">
	import CommonWarn from '$lib/wiki/components/common/commonWarn.svelte';

	let { ok, rev } = $props();
</script>

{#if ok && rev !== -1}
	<CommonWarn>이 문서는 <b>{rev}</b>번째 수정판임에 유의하세요.</CommonWarn>
{/if}
