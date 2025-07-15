<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import { type Info } from '@nemowiki/core/types';

	let { info }: { info: Info } = $props();

	let state = $derived(info.state);
</script>

{#snippet CommentInput()}
	<input
		id="comment-input"
		placeholder="문서 상태를 변경하는 이유를 입력해 주세요."
		name="comment"
		autocomplete="off"
	/>
{/snippet}

{#if state === 'deleted'}
	<h3>숨김</h3>
	<CommonForm formName="hide-form" actionName="hide">
		<div id="hide-form-div" class="container">
			{@render CommentInput()}
			<button form="hide-form" type="submit">변경</button>
		</div>
	</CommonForm>
{:else if state === 'hidden'}
	<h3>숨김 해제</h3>
	<CommonForm formName="show-form" actionName="show">
		<div id="show-form-div" class="container">
			{@render CommentInput()}
			<button form="show-form" type="submit">변경</button>
		</div>
	</CommonForm>
{:else}
	<p>삭제된 문서만 숨김이 가능합니다.</p>
{/if}

<style lang="scss">
	@use '../../../style/pages/state/stateForm.scss';
</style>
