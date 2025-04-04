<script lang="ts">
	import { HomeSolid } from 'flowbite-svelte-icons';
	const pages = [
		{ name: 'Posts', href: '/posts', current: false, id: 1 },
		{ name: title, href: slug, current: true, id: 2 }
	];
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
		<li class="flex">
			<div class="flex items-center">
				<a href="/" class="text-gray-400 hover:text-gray-500">
					<HomeSolid class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
					<span class="sr-only">Home</span>
				</a>
			</div>
		</li>
		{#each pages as page (page.id)}
			<li class="flex">
				<div class="flex items-center">
					<svg
						class="h-full w-6 flex-shrink-0 text-gray-200"
						viewBox="0 0 24 44"
						preserveAspectRatio="none"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
					</svg>
					<a
						href={page.href}
						class="text-blue-light ml-4 text-sm font-medium hover:text-gray-700"
						aria-current={page.current ? 'page' : undefined}
					>
						{page.name}
					</a>
				</div>
			</li>
		{/each}
	</ol>
</nav>
