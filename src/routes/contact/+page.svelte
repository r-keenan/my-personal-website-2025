<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	// Client API:
	const { form, errors, constraints, enhance, message } = superForm(data.form);
</script>

<div>
	<div class="mt-10 min-h-screen bg-white">
		<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
			<div class="relative bg-white shadow-xl">
				<h2 class="sr-only">Contact Me</h2>
				<!-- 
            <ToastContainer toastClassName="bg-green-success" />
        -->
				<div class="grid grid-cols-1 lg:grid-cols-3">
					<div class="bg-blue-light relative overflow-hidden px-6 py-10 sm:px-10 xl:p-12">
						<div class="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
							<svg
								class="absolute inset-0 h-full w-full"
								width={343}
								height={388}
								viewBox="0 0 343 388"
								fill="none"
								preserveAspectRatio="xMidYMid slice"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
									fill="url(#linear1)"
									fillOpacity=".1"
								/>
								<defs>
									<linearGradient
										id="linear1"
										x1="254.553"
										y1="107.554"
										x2="961.66"
										y2="814.66"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#fff" />
										<stop offset={1} stopColor="#fff" stopOpacity={0} />
									</linearGradient>
								</defs>
							</svg>
						</div>
						<div
							class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
							aria-hidden="true"
						>
							<svg
								class="absolute inset-0 h-full w-full"
								width={359}
								height={339}
								viewBox="0 0 359 339"
								fill="none"
								preserveAspectRatio="xMidYMid slice"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
									fill="url(#linear2)"
									fillOpacity=".1"
								/>
								<defs>
									<linearGradient
										id="linear2"
										x1="192.553"
										y1="28.553"
										x2="899.66"
										y2="735.66"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#fff" />
										<stop offset={1} stopColor="#fff" stopOpacity={0} />
									</linearGradient>
								</defs>
							</svg>
						</div>
						<div
							class="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
							aria-hidden="true"
						>
							<svg
								class="absolute inset-0 h-full w-full"
								width={160}
								height={678}
								viewBox="0 0 160 678"
								fill="none"
								preserveAspectRatio="xMidYMid slice"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
									fill="url(#linear3)"
									fillOpacity=".1"
								/>
								<defs>
									<linearGradient
										id="linear3"
										x1="192.553"
										y1="325.553"
										x2="899.66"
										y2="1032.66"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#fff" />
										<stop offset={1} stopColor="#fff" stopOpacity={0} />
									</linearGradient>
								</defs>
							</svg>
						</div>
						<h3 class="text-center text-xl font-medium tracking-wide text-white">Contact Me</h3>
						<p class="text-gray-dark mt-6 max-w-3xl text-base">
							Please fill out this contact form, and let me know what I can help you with. Turn
							around time for email responses is usually one to two business days.
						</p>
						<p class="text-gray-dark mt-6 max-w-3xl text-base">
							I can do everything from consulting, to new development, or overhauling your current
							site or web app.
						</p>
					</div>

					<div class="px-6 py-10 sm:px-10 lg:col-span-2 xl:p-12">
						<h3 class="text-gray-dark text-lg font-medium tracking-wide">Send Me a Message</h3>
						{#if $message}
							<div class="bg-green-success">{$message}</div>
						{/if}
						<form
							class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
							method="POST"
							use:enhance
						>
							<div>
								<label for="firstName" class="text-gray-dark block text-sm font-medium">
									First Name
								</label>
								<div class="mt-1">
									<input
										type="text"
										id="first-name"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.firstName}
										aria-invalid={$errors.firstName ? 'true' : undefined}
										{...$constraints.firstName}
										required
									/>
									{#if $errors.firstName}<span class="warning">{$errors.firstName}</span>{/if}
								</div>
							</div>
							<div>
								<label for="lastName" class="text-gray-dark block text-sm font-medium">
									Last Name
								</label>
								<div class="mt-1">
									<input
										type="text"
										id="last-name"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.lastName}
										aria-invalid={$errors.lastName ? 'true' : undefined}
										{...$constraints.lastName}
										required
									/>
									{#if $errors.lastName}<span class="warning">{$errors.lastName}</span>{/if}
								</div>
							</div>
							<div>
								<div class="flex justify-between">
									<label for="companyName" class="text-gray-dark block text-sm font-medium">
										Company Name
									</label>
									<span id="phone-optional" class="text-gray-medium text-sm"> Optional </span>
								</div>
								<div class="mt-1">
									<input
										type="text"
										id="company-name"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.companyName}
										aria-invalid={$errors.companyName ? 'true' : undefined}
										{...$constraints.companyName}
										aria-describedby="company-name-optional"
									/>
									{#if $errors.companyName}<span class="warning">{$errors.companyName}</span>{/if}
								</div>
							</div>
							<div>
								<div class="flex justify-between">
									<label for="companyWebsite" class="text-gray-dark block text-sm font-medium">
										Company Website
									</label>
									<span id="phone-optional" class="text-gray-medium text-sm"> Optional </span>
								</div>
								<div class="mt-1">
									<input
										type="url"
										id="company-website"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.companyWebsite}
										aria-invalid={$errors.companyWebsite ? 'true' : undefined}
										{...$constraints.companyWebsite}
										aria-describedby="company-website-optional"
									/>
									{#if $errors.companyWebsite}<span class="warning">{$errors.companyWebsite}</span
										>{/if}
								</div>
							</div>
							<div>
								<label for="email" class="text-gray-dark block text-sm font-medium"> Email </label>
								<div class="mt-1">
									<input
										id="email"
										type="email"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.email}
										aria-invalid={$errors.email ? 'true' : undefined}
										{...$constraints.email}
										required
									/>
									{#if $errors.email}<span class="warning">{$errors.email}</span>{/if}
								</div>
							</div>
							<div>
								<div class="flex justify-between">
									<label for="phone" class="text-gray-dark block text-sm font-medium">
										Phone
									</label>
									<span id="phone-optional" class="text-gray-medium text-sm"> Optional </span>
								</div>
								<div class="mt-1">
									<input
										type="text"
										id="phone"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.phone}
										aria-invalid={$errors.phone ? 'true' : undefined}
										{...$constraints.phone}
										aria-describedby="phone-optional"
									/>
									{#if $errors.phone}<span class="warning">{$errors.phone}</span>{/if}
								</div>
							</div>
							<div class="hidden">
								<div class="flex justify-between">
									<label for="botHoneyPot" class="text-gray-dark block text-sm font-medium">
										Honey Pot
									</label>
									<span id="bot-hp" class="text-gray-medium text-sm"> Optional </span>
								</div>
								<div class="mt-1">
									<input
										type="text"
										id="botHoneyPot"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.hp}
										aria-invalid={$errors.hp ? 'true' : undefined}
										{...$constraints.hp}
										aria-describedby="botHP"
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label for="subject" class="text-gray-dark block text-sm font-medium">
									Subject
								</label>
								<div class="mt-1">
									<input
										type="text"
										id="subject"
										class="text-gray-dark block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										bind:value={$form.subject}
										aria-invalid={$errors.subject ? 'true' : undefined}
										{...$constraints.subject}
										required
									/>
									{#if $errors.subject}<span class="warning">{$errors.subject}</span>{/if}
								</div>
							</div>
							<div class="sm:col-span-2">
								<div class="flex justify-between">
									<label for="message" class="text-gray-dark block text-sm font-medium">
										Message
									</label>
									<span id="message-max" class="text-gray-medium text-sm">
										Max. 1000 characters
									</span>
								</div>
								<div class="mt-1">
									<textarea
										id="message"
										rows={4}
										class="text-gray-dark block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										aria-describedby="message-max"
										bind:value={$form.message}
										aria-invalid={$errors.message ? 'true' : undefined}
										{...$constraints.message}
										required
									></textarea>
									{#if $errors.message}<span class="warning">{$errors.message}</span>{/if}
								</div>
							</div>
							<div
								class="grid justify-items-center justify-self-center sm:col-span-2 sm:flex sm:justify-end"
							>
								<button
									type="submit"
									class="bg-blue-light hover:bg-blue-dark inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
								>
									Send Message
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
