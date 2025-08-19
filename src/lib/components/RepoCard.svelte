<script lang="ts">
	import type { GitHubRepo } from '$lib/utils/types/types';
	import { Card } from 'flowbite-svelte';
	import { ArrowUpRightFromSquareOutline, GithubSolid, StarSolid } from 'flowbite-svelte-icons';

	let { repo, featured }: { repo: GitHubRepo; featured: boolean } = $props();

	repo.name = repo.name.includes('r-keenan/') ? repo.name.replace('r-keenan/', '') : repo.name;
</script>

<Card class="p-4 sm:p-6 md:p-8">
	<div class="mb-3 flex items-center justify-between">
		<GithubSolid class="h-6 w-6 text-gray-500 dark:text-gray-400" />
		{#if featured}
			<StarSolid class="h-6 w-6 shrink-0 text-amber-300 dark:text-amber-300" />
		{/if}
	</div>
	<a href="/">
		<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			{repo.name}
		</h5>
	</a>
	<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Repo Description</p>
	<a
		href="/"
		target="_blank"
		rel="noreferrer"
		class="text-blue-light inline-flex items-center hover:underline"
	>
		GitHub Repo
		<ArrowUpRightFromSquareOutline class="ms-2.5 h-4 w-4" />
	</a>
</Card>
