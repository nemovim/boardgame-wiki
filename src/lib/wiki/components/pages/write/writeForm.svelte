<script lang="ts">
	import { addPopupListener, removePopupListener } from '$lib/wiki/utils/footnotePopup.js';
	import type { Doc, WikiResponse } from '@nemowiki/core/types';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import { beforeNavigate } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	let { doc }: { doc: Doc } = $props();

	let markup = $state<string>(doc?.markup || '');
	let previewDoc = $derived<Doc>({
		...doc,
		markup
	});
	let previewResult = $state<ActionResult<WikiResponse<string>> | null>(null);
	let saveResult = $state<ActionResult | null>(null);

	$effect(() => {
		removePopupListener();
		previewResult;
		addPopupListener();
	});

	beforeNavigate((navigation) => {
		if (saveResult?.type !== 'redirect') {
			if (confirm('저장하지 않았습니다. 정말 나가시겠습니까?')) return;
			navigation.cancel();
		}
	});
</script>

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea id="content-textarea" contenteditable="true" bind:value={markup} autofocus name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input
		id="comment-input"
		placeholder="편집한 내용에 대해 간단한 설명을 입력해 주세요."
		name="comment"
		autocomplete="off"
	/>
{/snippet}

{#snippet PreviewForm()}
	<CommonForm actionName="preview" formName="preview-form" bind:formResult={previewResult}>
		<input type="hidden" value={JSON.stringify(previewDoc)} name="doc" />
	</CommonForm>
{/snippet}

{#snippet SaveForm()}
	<CommonForm actionName="save" formName="save-form" bind:formResult={saveResult}>
		<div id="save-form-div" class="container">
			{@render ContentTextarea()}
			{@render CommentInput()}
		</div>
	</CommonForm>
{/snippet}

{#snippet BtnDiv()}
	<div id="btn-div" class="container">
		<button form="preview-form" type="submit">미리보기</button>
		<button form="save-form" type="submit">저장하기</button>
	</div>
{/snippet}

{#snippet PreviewHtml()}
	{#if previewResult && previewResult.type === 'success' && previewResult.data?.ok}
		<hr />
		<HtmlContent content={previewResult.data.value} />
	{/if}
{/snippet}

<div id="write-form-div">
	{@render SaveForm()}
	{@render PreviewForm()}
	{@render BtnDiv()}
	{@render PreviewHtml()}
</div>

<style lang="scss">
	@use '../../../style/pages/write/writeForm.scss';
</style>
