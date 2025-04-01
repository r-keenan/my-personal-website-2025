<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/">
		<!--
		<img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		-->
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			>Ross Keenan</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/posts">Posts</NavLi>
		<NavLi href="/skills">Skills</NavLi>
		<NavLi href="/about">About Me</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>
