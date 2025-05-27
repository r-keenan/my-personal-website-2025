<script lang="ts">
	import BlogCard from '$components/BlogCard.svelte';
	import type { PostPreview } from '$lib/utils/types/types.js';

	export let data;
	const { postsPreview }: { postsPreview: PostPreview[] } = data.initialData;
</script>

<div class="lg:pb- relative bg-white px-4 pb-20 sm:px-6 sm:py-24 lg:px-8 lg:pt-12">
	<div class="absolute inset-0">
		<div class="h-1/3 bg-white sm:h-2/3"></div>
	</div>
	<div class="relative mx-auto max-w-7xl pt-24">
		<div class="text-center">
			<h2 class="text-gray-dark text-3xl font-extrabold tracking-tight sm:text-4xl">
				From the Blog
			</h2>
			<p class="text-gray-medium mx-auto mt-3 max-w-2xl text-xl sm:mt-4">
				Just random posts on where you can find me, and what I am working on.
			</p>
		</div>
		<div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
			{#each postsPreview as postPreview (postPreview.slug)}
				<BlogCard {postPreview} />
			{/each}
		</div>
	</div>
</div>
