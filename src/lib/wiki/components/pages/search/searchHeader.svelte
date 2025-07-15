<script lang="ts">
	import CommonHeader from '$lib/wiki/components/common/commonHeader.svelte';
	import { page } from '$app/state';

	const query = $derived<string>(page.params.query);
</script>

<CommonHeader>{`검색:${query}`}</CommonHeader>
