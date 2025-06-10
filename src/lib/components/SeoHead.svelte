<script lang="ts">
	import { page } from '$app/state';
	import type { SeoData } from '$lib/utils/types/types';

	export let data: SeoData;
</script>

<svelte:head>
	<title>{`${data.pageTitle} - Ross Keenan`}</title>
	<meta name="description" content={data.content} />
	<link rel="canonical" href={data.canonicalUrl} />
</svelte:head>
