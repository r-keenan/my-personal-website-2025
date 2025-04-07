<script lang="ts">
	import { skills } from '$lib/constants';
	import type { Skill } from '$lib/utils/types/types';

	export let skill: Skill;
</script>

<div class="pt-6">
	<div class="bg-gray-light flow-root h-full rounded-lg px-6 pb-8">
		<div class="-mt-6">
			<div>
				<span
					class="bg-blue-light inline-flex items-center justify-center rounded-md p-3 shadow-lg"
				>
					<skill.icon class="h-6 w-6 text-white" aria-hidden="true" />
				</span>
			</div>
			<h3 class="text-gray-dark mt-8 text-lg font-medium tracking-tight">
				{skill.name}
			</h3>
			<ul class="text-gray-medium mt-5 ml-8 list-disc text-left text-base">
				{#each skill.listItems as listItem (listItem)}
					<li>{listItem}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
