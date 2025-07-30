<script>
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';

	const navigation = [
		{ name: 'Posts', href: '/posts' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Skills', href: '/skills' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<footer class="bg-gray-light">
	<div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
		<nav class="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6" aria-label="Footer">
			{#each navigation as nav (nav.name)}
				<a href={nav.href} class="text-gray-dark hover:text-blue-light text-base">
					{nav.name}
				</a>
			{/each}
		</nav>
		<div class="mt-16 flex justify-center gap-x-10">
			<a
				href="https://www.linkedin.com/in/r-keenan"
				target="_blank"
				rel="noreferrer"
				class="hover:text-blue-light text-gray-400"
			>
				<span class="sr-only">LinkedIn</span>
				<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<LinkedinSolid />
				</svg>
			</a>
			<a
				href="https://www.github.com/r-keenan"
				target="_blank"
				rel="noreferrer"
				class="hover:text-blue-light text-gray-400"
			>
				<span class="sr-only">Facebook</span>
				<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<GithubSolid />
				</svg>
			</a>
		</div>
		<p class="text-gray-dark mt-8 text-center text-base">
			&copy; {new Date().getFullYear()} Ross Keenan. All rights reserved.
		</p>
	</div>
</footer>
