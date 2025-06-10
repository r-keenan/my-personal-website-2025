<script lang="ts">
	import { page } from '$app/state';
	import type { SeoData, SeoBlogPostData } from '$lib/utils/types/types';

	export let data: SeoData | SeoBlogPostData;

	const isSeoBlogPostData = (data: SeoData | SeoBlogPostData): data is SeoBlogPostData => {
		return 'imageUrl' in data && typeof data.imageUrl === 'string';
	};
</script>

<svelte:head>
	<title>{`${data.pageTitle} - Ross Keenan`}</title>
	<meta name="description" content={data.content} />
	<link rel="canonical" href={data.canonicalUrl} />
	{#if isSeoBlogPostData(data)}
		<meta property="og:title" content={data.pageTitle} />
		<meta property="og:description" content={data.content} />
		<meta property="og:image" content={data.imageUrl} />
		<meta property="og:type" content="article" />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
