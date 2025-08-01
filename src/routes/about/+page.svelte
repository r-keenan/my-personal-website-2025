<script lang="ts">
	import SeoHead from '$components/SeoHead.svelte';
	import aboutMePic2 from '$lib/images/meQuarterHeight.jpg';
	import type { SeoData } from '$lib/utils/types/types';

	const content =
		'Ross Keenan is a Senior Software Consultant specializing in web development, JavaScript frameworks, backend systems, and data engineering. Available for contract work.';
	const pageTitle = 'About';
	const canonicalUrl = 'https://rosskeenan.com/about';

	const seoData: SeoData = {
		pageTitle,
		content,
		canonicalUrl
	};
</script>

<SeoHead data={seoData} />

<div>
	<div class="relative min-h-screen bg-white py-8 pt-20 sm:py-20 sm:pt-32">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<!-- Avatar Image Section -->
			<div class="my-8 flex justify-center sm:mb-12">
				<div class="relative rounded-2xl shadow-xl">
					<img class="h-auto w-32 rounded-2xl object-contain sm:w-40" src={aboutMePic2} alt="Me" />
				</div>
			</div>

			<!-- Content Section -->
			<div class="text-center">
				<h2 class="text-gray-dark text-3xl font-extrabold tracking-tight sm:text-4xl">
					Ross Keenan
				</h2>
				<h3 class="text-gray-dark pt-2 text-2xl font-bold tracking-tight sm:text-2xl">
					Senior Software Consultant
				</h3>
				<div class="text-gray-medium mx-auto mt-6 max-w-3xl space-y-6">
					<p class="text-base leading-7">
						I develop in everything from Content Management Systems (CMS) to web sites and web apps.
						I have experience in everything from the hot, new JavaScript frameworks, to backend
						code, Generative AI, databases, and data engineering. You can see a full list of my
						skills and experience <a href="/skills" class="text-blue-light text-base font-medium"
							>here</a
						>.
					</p>
					<p class="text-base leading-7">
						I have six years of experience in Software Engineering, and I am a veteran of the Iraq
						War. I served in Iraq from 2006-2007, doing Convoy Security, and I was in the Nebraska
						Army National Guard from 2004-2010.
					</p>
					<p class="text-base leading-7">
						Feel free to reach out to me for any consultations for any tech-related issue or inquiry
						that you have. I am available to hire for hourly or fixed-priced contracts.
					</p>
					<p class="text-base leading-7">
						<span>Let&apos;s make something great together!</span>
					</p>
				</div>
				<div class="mt-10">
					<div>
						<a href="/contact" class="text-blue-light text-base font-medium">
							Reach out to me <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
