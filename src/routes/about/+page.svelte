<script lang="ts">
	import aboutMePic2 from '$lib/images/meQuarterHeight.jpg';
</script>

<div>
	<div class="relative min-h-screen bg-white py-8 pt-28 sm:py-20 sm:pt-32">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<!-- Avatar Image Section -->
			<div class="my-8 flex justify-center sm:mb-12">
				<div class="h-64 w-64 rounded-2xl shadow-xl sm:h-80 sm:w-80">
					<img class="h-full w-full rounded-2xl object-contain" src={aboutMePic2} alt="Me" />
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
						I am interested in everything from the hot, new JavaScript frameworks, to backend code,
						databases, and data engineering.
					</p>
					<p class="text-base leading-7">
						Feel free to reach out to me for any consultations or sites that you want to develop or
						update. I am not looking for full-time employment, but I am open to outside contract
						work. I am available to hire for hourly or fixed-priced contracts.
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
