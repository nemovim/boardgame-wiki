<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet CommentInput()}
	<input
		id="comment-input"
		placeholder="삭제하는 이유를 입력해 주세요."
		name="comment"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="delete-form">
	<div id="delete-form-div" class="container">
		{@render CommentInput()}
		<button form="delete-form" type="submit" class="warn-btn">삭제</button>
	</div>
</CommonForm>

<style lang="scss">
	@use '../../../style/pages/delete/deleteForm.scss';
</style>
