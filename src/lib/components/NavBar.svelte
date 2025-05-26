<script lang="ts">
	import { page } from '$app/state';
	import avi from '$images/myAvi.jpg';
	import { Avatar, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

	let activeUrl = $derived(page.url.pathname.includes('posts') ? '/posts' : page.url.pathname);

	let activeClass =
		'text-white-DEFAULT bg-green-100 md:bg-transparent md:text-white-DEFAULT md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
	let nonActiveClass =
		'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
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
			<Avatar id="avatar-menu" src={avi} />
			<NavHamburger />
		</div>
		<NavUl {activeUrl} {activeClass} {nonActiveClass}>
			<NavLi
				href="/"
				class="text-blue-light hover:bg-gray-light hover:text-white-DEFAULT pr-2 text-lg"
				>Home</NavLi
			>
			<NavLi href="/posts" class="text-blue-light pr-4 text-lg hover:bg-gray-700 hover:text-white"
				>Posts</NavLi
			>
			<NavLi href="/skills" class="text-blue-light pr-4 text-lg hover:bg-gray-700 hover:text-white"
				>Skills</NavLi
			>
			<NavLi href="/about" class="text-blue-light pr-4 text-lg hover:bg-gray-700 hover:text-white"
				>About Me</NavLi
			>
			<NavLi href="/contact" class="text-blue-light text-lg hover:bg-gray-700 hover:text-white"
				>Contact</NavLi
			>
		</NavUl>
	</Navbar>
{/key}
