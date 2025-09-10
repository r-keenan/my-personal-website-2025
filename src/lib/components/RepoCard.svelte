<script lang="ts">
	import type { GitHubRepo } from '$lib/utils/types/types';
	import { Card } from 'flowbite-svelte';
	import {
		ArrowUpRightFromSquareOutline,
		GithubSolid,
		LaptopCodeSolid,
		StarSolid
	} from 'flowbite-svelte-icons';

	let { repo, featured }: { repo: GitHubRepo; featured: boolean } = $props();

	repo.name = repo.name.includes('r-keenan/') ? repo.name.replace('r-keenan/', '') : repo.name;
</script>

<Card class="h-full p-4 sm:p-6 md:p-8">
	<div class="flex h-full flex-col">
		<div class="mb-3 flex items-center justify-between">
			<GithubSolid class="h-6 w-6 text-gray-500 dark:text-gray-400" />
			<h5
				class="truncate overflow-hidden pl-2.5 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
			>
				{repo.name}
			</h5>
			{#if featured}
				<StarSolid class="h-6 w-6 shrink-0 text-amber-300 dark:text-amber-300" />
			{:else}
				<p></p>
			{/if}
		</div>
		{#if featured}
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{repo.description}</p>
		{/if}
		<div class="mt-auto space-y-3">
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
				<span class="font-bold text-black">Last Updated:</span>
				{repo.updatedAt}
			</p>
			<div class="mb-3 flex items-center gap-2">
				<LaptopCodeSolid class="h-6 w-6 shrink-0 text-blue-400 dark:text-blue-400" />
				<p>
					{repo.language}
				</p>
			</div>
			<a
				href={repo.url}
				target="_blank"
				rel="noreferrer"
				class="text-blue-light inline-flex items-center hover:underline"
			>
				GitHub Repo
				<ArrowUpRightFromSquareOutline class="ms-2.5 h-4 w-4" />
			</a>
		</div>
	</div>
</Card>
