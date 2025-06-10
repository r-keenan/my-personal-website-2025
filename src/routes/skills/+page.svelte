<script lang="ts">
	import SeoHead from '$components/SeoHead.svelte';
	import SkillCard from '$lib/components/SkillsCard.svelte';
	import { skills } from '$lib/constants/index';
	import type { SeoData } from '$lib/utils/types/types';

	const content =
		"Comprehensive overview of Ross Keenan's technical skills including full stack development, data engineering, and analysis. Explore technologies and frameworks I'm experienced with.";
	const pageTitle = 'Skills';
	const canonicalUrl = 'https://rosskeenan.com/skills';

	const seoData: SeoData = {
		pageTitle,
		content,
		canonicalUrl
	};
</script>

<SeoHead data={seoData} />

<div>
	<div class="relative bg-white pt-24 pb-20 sm:py-24 lg:pt-32">
		<div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
			<h2 class="text-gray-dark text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
				My Skills
			</h2>
			<p class="text-gray-medium mx-auto mt-5 max-w-prose text-xl">
				I am a Full Stack Developer with some data engineering and analysis thrown in as well.
				Continue reading to find out which technologies that I am most experienced with.
			</p>
			<div class="mt-12">
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{#each skills as skill (skill.name)}
						<SkillCard {skill} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
