<script lang="ts">
	import { goto } from '$app/navigation';
	import FileUp from '@lucide/svelte/icons/file-up';

	function uploadBtnClick() {
		goto('/f');
	}
</script>

<div id="upload-div">
	<button id="upload-btn" class="container" onclick={uploadBtnClick}>
		<FileUp size="1.5rem" /><span>&nbsp;업로드</span>
	</button>
</div>

<style lang="scss">
	@use '../../style/layout/uploadModule.scss';
</style>
