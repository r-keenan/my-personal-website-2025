<script lang="ts">
	import { page } from '$app/state';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	let activeUrl = $derived(page.url.pathname.includes('posts') ? '/posts' : page.url.pathname);

	let activeClass =
		'text-white-DEFAULT bg-green-100 md:bg-transparent md:text-white-DEFAULT md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
	let nonActiveClass =
		'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<Navbar class="bg-blue-dark/80 fixed top-0 z-10 w-full text-white backdrop-blur-md">
	<NavBrand href="/">
		<!--
		<img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		-->
		<span
			class="shake self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			id="myNameHeader">Ross Keenan</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl} {activeClass} {nonActiveClass}>
		<NavLi href="/" class="text-blue-light hover:bg-gray-light hover:text-white-DEFAULT">Home</NavLi
		>
		<NavLi href="/posts" class="text-blue-light hover:bg-gray-700 hover:text-white">Posts</NavLi>
		<NavLi href="/skills" class="text-blue-light hover:bg-gray-700 hover:text-white">Skills</NavLi>
		<NavLi href="/about" class="text-blue-light hover:bg-gray-700 hover:text-white">About Me</NavLi>
		<NavLi href="/contact" class="text-blue-light hover:bg-gray-700 hover:text-white">Contact</NavLi
		>
	</NavUl>
</Navbar>
