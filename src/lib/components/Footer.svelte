<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterIcon
	} from 'flowbite-svelte';
	import { GithubSolid, LinkedinSolid } from 'flowbite-svelte-icons';
</script>

<Footer footerType="logo">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterLinkGroup
			class="mb-6 flex flex-wrap items-center text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/posts">Posts</FooterLink>
			<FooterLink href="/skills">Skills</FooterLink>
			<FooterLink href="/about">About Me</FooterLink>
			<FooterLink href="/contact">Contact</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<FooterCopyright href="/" by="Ross Keenan" />
	<div class="mt-4 flex space-x-6 pt-3 sm:mt-0 sm:justify-center rtl:space-x-reverse">
		<FooterIcon href="https://github.com/r-keenan" target="_blank" rel="noopener noreferrer">
			<GithubSolid
				class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon>
		<FooterIcon
			href="https://www.linkedin.com/in/r-keenan"
			target="_blank"
			rel="noopener noreferrer"
		>
			<LinkedinSolid
				class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon>
	</div>
</Footer>
