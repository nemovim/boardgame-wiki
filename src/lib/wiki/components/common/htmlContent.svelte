<script lang="ts">
	let { content }: { content: string | null } = $props();
	let html = $derived.by<string>(() => {
		if (!content) return '';
		return content.replace('<div id="content"><div><br>', '<div id="content"><div>');
	});
</script>

<article class="kmu">{@html html}</article>

<style lang="scss">
	@use '../../style/kmu.scss';
</style>
