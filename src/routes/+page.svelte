<script lang="ts">
	export let data;
	const { qualifications } = data.initialData;
</script>

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
					<p>{qual.category}</p>
				</div>
			{/each}

			<div class="mt-10 grid place-content-center content-center">
				<div class="mt-10">
					<a href="/skills" class="text-blue-light text-base font-medium">
						Check out the details of my skills
						<span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
		</dl>
	</div>
</div>
