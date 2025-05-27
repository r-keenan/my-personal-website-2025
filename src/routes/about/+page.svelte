<script lang="ts">
	import aboutMePic2 from '$lib/images/meQuarterHeight.jpg';
</script>

<div>
	<div class="relative min-h-screen bg-white py-8 sm:py-20 lg:pt-50 lg:pb-72">
		<div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
			<div class="relative sm:py-16 lg:py-0">
				<div
					class="relative mx-auto max-w-md px-10 py-4 sm:max-w-max sm:px-6 lg:max-w-max lg:px-16 lg:py-20"
				>
					<div class="grid justify-items-center overflow-hidden rounded-2xl shadow-xl">
						<img
							class="absolute inset-0 h-full w-full rounded-2xl object-cover"
							src={aboutMePic2}
							alt="Me"
						/>
					</div>
				</div>
			</div>
			<div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
				<div class="pt-12 sm:pt-16 lg:pt-20">
					<h2 class="text-gray-dark text-3xl font-extrabold tracking-tight sm:text-4xl">
						Ross Keenan
					</h2>
					<h3 class="text-gray-dark pt-2 text-2xl font-bold tracking-tight sm:text-2xl">
						Senior Software Consultant
					</h3>
					<div class="text-gray-medium mt-6 space-y-6">
						<p class="text-base leading-7">
							I develop in everything from Content Management Systems (CMS) to web sites and web
							apps. I am interested in everything from the hot, new JavaScript frameworks, to
							backend code, databases, and data engineering.
						</p>
						<p class="text-base leading-7">
							Feel free to reach out to me for any consultations or sites that you want to develop
							or update. I am not looking for full-time employment, but I am open to outside
							contract work. I am available to hire for hourly or fixed-priced contracts.
						</p>
						<p class="text-base leading-7">
							<span>Let&apos;s make something great together!</span>
						</p>
					</div>
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
