<script lang="ts">
	import { page } from '$app/state';
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import Avatar from '$components/Avatar.svelte';

	let activeUrl = $derived(page.url.pathname.includes('posts') ? '/posts' : page.url.pathname);

	let activeClass =
		'text-white-DEFAULT bg-green-100 md:bg-transparent md:text-white-DEFAULT md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
	let nonActiveClass =
		'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Posts', href: '/posts' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Skills', href: '/skills' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

{#key activeUrl}
	<Navbar class="bg-blue-dark/80 fixed top-0 z-10 w-full text-white backdrop-blur-md">
		<NavBrand href="/" class="pl-2.5">
			<span
				class="shake self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				id="myNameHeader">Ross Keenan</span
			>
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Button class="bg-blue-light hover:bg-blue-dark mr-4 hidden md:block" size="sm"
				><a href="/contact">Contact Me</a></Button
			>
			<Avatar isClickable={true} />
			<NavHamburger />
		</div>
		<NavUl {activeUrl} {activeClass} {nonActiveClass}>
			{#each navigation as nav (nav.name)}
				<NavLi
					href={nav.href}
					data-sveltekit-preload-data="hover"
					class="text-blue-light hover:bg-gray-light hover:text-white-DEFAULT pr-2 text-lg"
					>{nav.name}</NavLi
				>
			{/each}
		</NavUl>
	</Navbar>
{/key}
