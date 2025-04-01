<script lang="ts">
	export let data;
	const qualifications = data.initialData;
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
			<!-- 
            {qualifications.map((qualification: Qualification) => (
              <div key={qualification._id} class="relative">
                <dt>
                  <CheckIcon
                    class="absolute h-6 w-6 text-blue-light"
                    aria-hidden="true"
                  />
                  <p class="ml-9 text-lg leading-6 font-medium text-gray-dark">
                    {qualification.category}
                  </p>
                </dt>

                <dd class="mt-2 ml-9 text-base text-gray-medium">
                  {qualification.description[0].children[0].text.toString()}
                </dd>
              </div>
            ))}
          </dl>
-->
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
