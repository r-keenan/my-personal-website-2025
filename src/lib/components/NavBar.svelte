<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
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
	<NavUl>
		<NavLi href="/" class="text-blue-light">Home</NavLi>
		<NavLi href="/posts" class="text-blue-light">Posts</NavLi>
		<NavLi href="/skills" class="text-blue-light">Skills</NavLi>
		<NavLi href="/about" class="text-blue-light">About Me</NavLi>
		<NavLi href="/contact" class="text-blue-light">Contact</NavLi>
	</NavUl>
</Navbar>
