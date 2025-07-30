<script>
	import { Card } from 'flowbite-svelte';
	import { ArrowUpRightFromSquareOutline, GithubSolid } from 'flowbite-svelte-icons';
</script>

<Card class="p-4 sm:p-6 md:p-8">
	<GithubSolid class="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400" />
	<a href="/">
		<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Need a help in Claim?
		</h5>
	</a>
	<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
		Go to this step by step guideline process on how to certify for your weekly benefits:
	</p>
	<a
		href="/"
		target="_blank"
		rel="noreferrer"
		class="text-primary-600 inline-flex items-center hover:underline"
	>
		GitHub Repo
		<ArrowUpRightFromSquareOutline class="ms-2.5 h-4 w-4" />
	</a>
</Card>
