<script lang="ts">
	import RepoCard from '$components/RepoCard.svelte';
	import SeoHead from '$components/SeoHead.svelte';
	import type { SeoData } from '$lib/utils/types/types';

	const content =
		'Ross Keenan is a Senior Software Consultant specializing in web development, JavaScript frameworks, backend systems, and data engineering. Available for contract work and consulting.';
	const pageTitle = 'Projects';
	const canonicalUrl = 'https://rosskeenan.com/projects';

	const seoData: SeoData = {
		pageTitle,
		content,
		canonicalUrl
	};
</script>

<SeoHead data={seoData} />

<div class="lg:pb- relative bg-white px-4 pb-20 sm:px-6 sm:py-24 lg:px-8 lg:pt-12">
	<div class="absolute inset-0">
		<div class="h-1/3 bg-white sm:h-2/3"></div>
	</div>
	<div class="relative mx-auto max-w-7xl pt-24">
		<div class="text-center">
			<h2 class="text-gray-dark text-3xl font-extrabold tracking-tight sm:text-4xl">My Projects</h2>
			<p class="text-gray-medium mx-auto mt-3 max-w-2xl text-xl sm:mt-4">
				Projects and Tutorials that I have worked on or am currently working on
			</p>
			<h3 class="text-gray-dark pt-8 text-2xl font-extrabold tracking-tight sm:text-2xl">
				Featured Projects
			</h3>
		</div>
		<div class="mx-auto mt-8 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
			<RepoCard />
			<!--
			{#each postsPreview as postPreview (postPreview.slug)}
				<BlogCard {postPreview} />
			{/each}
			-->
		</div>
		<div class="text-center">
			<h3 class="text-gray-dark pt-8 text-2xl font-extrabold tracking-tight sm:text-2xl">
				All Projects
			</h3>
		</div>
		<div class="mx-auto mt-8 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
			<RepoCard />
			<!--
			{#each postsPreview as postPreview (postPreview.slug)}
				<BlogCard {postPreview} />
			{/each}
			-->
		</div>
	</div>
</div>
