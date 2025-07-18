<script lang="ts">
	import CommonHeader from '$lib/wiki/components/common/commonHeader.svelte';
	import GoogleModule from '$lib/wiki/components/layout/googleModule.svelte';
</script>

<CommonHeader>로그인</CommonHeader>
<p>로그인하면 문서 편집 및 다양한 기능의 사용이 가능합니다!</p>
<hr />
<GoogleModule />

<style>
	hr {
		margin-bottom: 1rem;
	}
</style>
