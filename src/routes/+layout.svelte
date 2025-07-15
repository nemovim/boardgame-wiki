<script lang="ts">
	import '$lib/wiki/style/main.css';

	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	import { afterNavigate } from '$app/navigation';
	import { addPopupListener } from '$lib/wiki/utils/footnotePopup.js';
	import { onMount } from 'svelte';

	import RecentModule from '$lib/wiki/components/layout/recentModule.svelte';
	import ProfileModule from '$lib/wiki/components/layout/profileModule.svelte';
	import HeaderModule from '$lib/wiki/components/layout/headerModule.svelte';
	import FooterModule from '$lib/wiki/components/layout/footerModule.svelte';

	injectAnalytics();
	injectSpeedInsights();

	let { children } = $props();

	onMount(() => {
		addPopupListener();
	});

	afterNavigate(() => {
		addPopupListener();
	});
</script>

<HeaderModule />

<div>
	<main class="module">
		{@render children()}
	</main>

	<aside>
		<ProfileModule />
		<RecentModule />
	</aside>
</div>

<FooterModule />

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
	}

	main {
		padding: 1rem 2rem;
		max-width: 55rem;
		width: stretch;
		height: stretch;
	}
</style>
