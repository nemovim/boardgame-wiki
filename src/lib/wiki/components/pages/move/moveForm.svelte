<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewFullTitleInput()}
	<label for="new-full-title-input"><h3>이동할 전체 제목</h3></label>
	<input
		id="new-full-title-input"
		placeholder="본 문서가 이동할 전체 제목을 입력해 주세요."
		name="new-full-title"
	/>
{/snippet}

{#snippet CommentInput()}
	<label for="comment-input"><h3>이동 이유</h3></label>
	<input
		id="comment-input"
		placeholder="이동하는 이유를 입력해 주세요."
		name="comment"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="move-form">
	<div id="move-form-div" class="container">
		{@render NewFullTitleInput()}
		{@render CommentInput()}
		<button form="move-form" type="submit">이동</button>
	</div>
</CommonForm>

<style lang="scss">
	@use '../../../style/pages/move/moveForm.scss';
</style>
