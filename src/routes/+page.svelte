<script lang="ts">
	import SeoHead from '$components/SeoHead.svelte';
	import HomeHero from '$lib/components/HomeHero.svelte';
	import type { SeoData } from '$lib/utils/types/types.js';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let currentSlide = 0;

	export let data;
	const { qualifications } = data.initialData;

	const techLogos = [
		{ alt: 'Python logo', src: '/logos/python.svg', title: 'Python' },
		{ alt: 'C# logo', src: '/logos/csharp.svg', title: 'C#' },
		{ alt: 'React logo', src: '/logos/react.svg', title: 'React' },
		{ alt: 'Svelte logo', src: '/logos/svelte.svg', title: 'Svelte' },
		{ alt: 'Vue logo', src: '/logos/vue.svg', title: 'Vue' },
		{ alt: 'Angular logo', src: '/logos/angular.svg', title: 'Angular' },
		{ alt: 'Node.js logo', src: '/logos/nodejs.svg', title: 'Node.js' },
		{ alt: 'Golang logo', src: '/logos/golang.svg', title: 'Go' },
		{ alt: 'Azure logo', src: '/logos/azure.svg', title: 'Azure' },
		{ alt: 'AWS logo', src: '/logos/aws.svg', title: 'AWS' },
		{ alt: 'PostgreSQL logo', src: '/logos/postgres.svg', title: 'PostgreSQL' },
		{ alt: 'SQL Server logo', src: '/logos/sqlserver.svg', title: 'SQL Server' },
		{ alt: 'Docker logo', src: '/logos/docker.svg', title: 'Docker' },
		{ alt: 'Apache Kafka logo', src: '/logos/kafka.svg', title: 'Kafka' },
		{ alt: 'Vercel logo', src: '/logos/vercel.svg', title: 'Vercel' },
		{ alt: 'GitHub logo', src: '/logos/github.svg', title: 'GitHub' },
		{ alt: 'JetBrains Rider logo', src: '/logos/rider.svg', title: 'Rider' },
		{ alt: 'VS Code logo', src: '/logos/vscode.svg', title: 'VS Code' },
		{ alt: 'Windsurf logo', src: '/logos/windsurf.svg', title: 'Windsurf' },
		{ alt: 'Neovim logo', src: '/logos/neovim.svg', title: 'Neovim' }
	];

	// Group logos into slides - 5 for desktop, 4 for mobile
	const desktopSlides: (typeof techLogos)[] = [];
	const mobileSlides: (typeof techLogos)[] = [];

	for (let i = 0; i < techLogos.length; i += 5) {
		const slide = techLogos.slice(i, i + 5);
		desktopSlides.push(slide);
	}

	for (let i = 0; i < techLogos.length; i += 4) {
		const slide = techLogos.slice(i, i + 4);
		mobileSlides.push(slide);
	}

	let currentDesktopSlide = 0;
	let currentMobileSlide = 0;

	onMount(() => {
		const desktopInterval = setInterval(() => {
			currentDesktopSlide = (currentDesktopSlide + 1) % desktopSlides.length;
		}, 3000);

		const mobileInterval = setInterval(() => {
			currentMobileSlide = (currentMobileSlide + 1) % mobileSlides.length;
		}, 3000);

		return () => {
			clearInterval(desktopInterval);
			clearInterval(mobileInterval);
		};
	});

	const content =
		'Senior Software Consultant specializing in web development, JavaScript frameworks, backend systems, and data engineering. Available for consulting and contract work.';
	const pageTitle = 'Home';
	const canonicalUrl = 'https://rosskeenan.com/';

	const seoData: SeoData = {
		pageTitle,
		content,
		canonicalUrl
	};
</script>

<SeoHead data={seoData} />

<HomeHero />

<!-- Technology Carousel Section -->
<div class="bg-blue-light py-16 opacity-75">
	<div class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-gray-darker mb-4 text-3xl font-extrabold">Technologies I Work With</h2>
			<p class="text-gray-dark mb-8 text-lg">
				Here are some of the key technologies and tools I use to build modern applications.
			</p>
		</div>
		<div class="mx-auto max-w-4xl">
			<div class="relative h-48 overflow-hidden rounded-lg bg-white shadow-md">
				<div class="flex h-full items-center justify-center p-6">
					<!-- Desktop view: 5 logos -->
					<div class="hidden w-full grid-cols-5 gap-6 md:grid">
						{#each desktopSlides[currentDesktopSlide] as logo}
							<div class="flex flex-col items-center transition-opacity duration-500">
								<img src={logo.src} alt={logo.alt} class="mb-3 h-18 w-18 object-contain" />
								<span class="text-gray-dark text-center text-sm font-medium">{logo.title}</span>
							</div>
						{/each}
					</div>

					<!-- Mobile view: 4 logos -->
					<div class="grid w-full grid-cols-4 gap-4 md:hidden">
						{#each mobileSlides[currentMobileSlide] as logo}
							<div class="flex flex-col items-center transition-opacity duration-500">
								<img src={logo.src} alt={logo.alt} class="mb-3 h-16 w-16 object-contain" />
								<span class="text-gray-dark text-center text-xs font-medium">{logo.title}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="bg-white">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12">
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
