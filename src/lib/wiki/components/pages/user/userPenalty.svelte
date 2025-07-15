<script lang="ts">
	import type { PenaltyDoc, PenaltyType } from '@nemowiki/core/types';
	import { parseDateTime } from '$lib/wiki/utils/general.js';

	let { penaltyArr } = $props();

	function parseType(type: PenaltyType): string {
		if (type === 'block') return '<span style="color:red"><b>[차단]</b></span>';
		else if (type === 'warn') return '<span style="color:darkorange"><b>[경고]</b></span>';
		else return '기타';
	}

	function parseUntil(until: Date, duration: number): string {
		if (duration === 0) return '<span style="color:red"><b>(무기한)</b></span>';
		else return parseDateTime(until) + ' 까지';
	}
</script>

{#snippet PenaltyHeader(penalty: PenaltyDoc, idx: number)}
	<span>
		<b>{idx + 1}.</b>
		{@html parseType(penalty.type)} <i>{penalty.comment}</i>
		<!-- {@html getType(penalty.type)} <span style:color={'grey'}>{penalty.comment}</span> -->
	</span>
{/snippet}

{#snippet PenaltyDate(penalty: PenaltyDoc)}
	<span>
		{@html parseUntil(penalty.until, penalty.duration)}
	</span>
{/snippet}

<div id="user-penalty-div">
	<h3>경고 및 차단</h3>
	{#if penaltyArr.length === 0}
		<p>받은 경고 및 차단 사항이 없습니다.</p>
	{:else}
		{#each penaltyArr as penalty, idx (penalty._id)}
			<div class="penalty-div">
				{@render PenaltyHeader(penalty, idx)}
				{@render PenaltyDate(penalty)}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	@use '../../../style/pages/user/userPenalty.scss';
</style>
