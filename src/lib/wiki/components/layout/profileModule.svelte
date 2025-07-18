<script lang="ts">
	import { page } from '$app/state';
	import { signOut } from '@auth/sveltekit/client';
	import type { User } from '@nemowiki/core/types';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import LogOut from '@lucide/svelte/icons/log-out';
	import LogIn from '@lucide/svelte/icons/log-in';
	import { goto } from '$app/navigation';

	let user: User = $derived(JSON.parse(page.data.user));
</script>

{#snippet GuestProfile()}
	<h2>비회원</h2>
	<hr />
	<button id="login-btn" class="container" onclick={() => goto('/signin')}
		><LogIn size="1rem" color="var(--color-primary-0)" /><span>&nbsp;로그인</span></button
	>
{/snippet}

{#snippet UserProfile(user: User)}
	<h2 class="container">
		<a href="/u/{encodeFullTitle(user.name)}">{user.name}</a>
	</h2>
	<hr />
	<div>
		<p>권한 등급: {user.group}</p>
		<p>기여 수: {user.contribCnt}</p>
	</div>
	<hr />
	<button id="logout-btn" class="container" onclick={() => signOut()}
		><LogOut size="1rem" color="var(--color-primary-0)" /><span>&nbsp;로그아웃</span></button
	>
{/snippet}

<!-- <section class="container"> -->
<section class="module">
	{#if user.email === null}
		{@render GuestProfile()}
	{:else}
		{@render UserProfile(user)}
	{/if}
</section>

<style lang="scss">
	@use '../../style/layout/profileModule.scss';
</style>
