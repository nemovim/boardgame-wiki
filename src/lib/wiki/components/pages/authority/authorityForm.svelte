<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import { page } from '$app/state';

	const { info } = $props();
	const userGroup = $derived(JSON.parse(page.data.user).group);
</script>

{#snippet DocActionSelect()}
	<select id="doc-action-select" name="doc-action">
		<option value="read">읽기</option>
		<option value="create">생성</option>
		<option value="edit">편집</option>
		<option value="move">이동</option>
		<option value="delete">삭제</option>
		<option value="change_authority">권한</option>
		<option value="change_state">상태</option>
	</select>
{/snippet}

{#snippet GroupInput()}
	<input
		id="group-input"
		name="group"
		placeholder="허용할 권한들을 쉼표로 구분하여 입력하세요."
		autocomplete="off"
	/>
{/snippet}

{#if info.authority['change_authority']?.includes(userGroup)}
	<CommonForm formName="authority-form">
		<div id="authority-form-div" class="container">
			{@render DocActionSelect()}
			{@render GroupInput()}
			<button form="authority-form" type="submit">적용</button>
		</div>
	</CommonForm>
{/if}

<style lang="scss">
	@use '../../../style/pages/authority/authorityForm.scss';
</style>
