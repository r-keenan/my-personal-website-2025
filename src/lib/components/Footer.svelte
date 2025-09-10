<script>
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
	import UpworkIcon from '$components/icons/Upwork.svelte';

	const navigation = [
		{ name: 'Posts', href: '/posts' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Skills', href: '/skills' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<footer class="bg-blue-dark">
	<div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
		<nav class="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6" aria-label="Footer">
			{#each navigation as nav (nav.name)}
				<a href={nav.href} class="text-white-DEFAULT hover:text-blue-light text-base">
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
				<span class="sr-only">GitHub</span>
				<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<GithubSolid />
				</svg>
			</a>
			<a
				href="https://www.upwork.com/freelancers/~0136d18441afe1e7e8"
				target="_blank"
				rel="noreferrer"
				class="hover:text-blue-light text-gray-400"
			>
				<span class="sr-only">Upwork</span>
				<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<UpworkIcon />
				</svg>
			</a>
		</div>
		<p class="text-white-DEFAULT mt-8 text-center text-base">
			&copy; {new Date().getFullYear()} Ross Keenan. All rights reserved.
		</p>
	</div>
</footer>
