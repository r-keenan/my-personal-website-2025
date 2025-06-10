<script lang="ts">
	import SeoHead from '$components/SeoHead.svelte';
	import HomeHero from '$lib/components/HomeHero.svelte';
	import type { SeoData } from '$lib/utils/types/types.js';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';

	export let data;
	const { qualifications } = data.initialData;

	const metaContent =
		'Senior Software Consultant specializing in web development, JavaScript frameworks, backend systems, and data engineering. Available for consulting and contract work.';
	const seoTitle = 'Home';
	const url = 'https://rosskeenan.com/';

	const seoData: SeoData = {
		pageTitle: seoTitle,
		content: metaContent,
		canonicalUrl: url
	};
</script>

<SeoHead data={seoData} />

<HomeHero />
<div class="bg-white">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-gray-dark text-3xl font-extrabold">Senior Software Consultant</h2>
			<p class="text-gray-medium mt-4 text-lg">
				Here is a quick overview of the skills that I have acquired throughout my career.
			</p>
		</div>
		<dl
			class="mt-12 space-y-10 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8"
		>
			{#each qualifications as qual, i (qual.id || i)}
				<div class="relative" data-index={i}>
					<dt>
						<CheckCircleSolid class="text-blue-light absolute h-6 w-6" aria-hidden="true" />
						<p class="text-gray-dark ml-9 text-lg leading-6 font-medium">
							{qual.category}
						</p>
					</dt>
					<dd class="text-gray-medium mt-2 ml-9 text-base">
						{qual.description[0].children[0].text.toString()}
					</dd>
				</div>
			{/each}
		</dl>
		<div class="mt-10 grid place-content-center content-center">
			<div class="mt-10">
				<a href="/skills" class="text-blue-light text-base font-medium">
					Check out the details of my skills
					<span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>
	</div>
</div>
