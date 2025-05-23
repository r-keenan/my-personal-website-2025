<script lang="ts">
	import Avatar from '$components/Avatar.svelte';
	import { MONTH_FORMAT } from '$lib/enums/index.js';
	import { formatBlogDate } from '$lib/utils/utilityFunctions';
	import type { PostPreview } from '$lib/utils/types/types';

	export let data;
	const { postsPreview } = data.initialData;
</script>

<div class="lg:pb- relative bg-white px-4 pb-20 sm:px-6 sm:py-24 lg:px-8 lg:pt-12">
	<div class="absolute inset-0">
		<div class="h-1/3 bg-white sm:h-2/3"></div>
	</div>
	<div class="relative mx-auto max-w-7xl pt-24">
		<div class="text-center">
			<h2 class="text-gray-dark text-3xl font-extrabold tracking-tight sm:text-4xl">
				From the Blog
			</h2>
			<p class="text-gray-medium mx-auto mt-3 max-w-2xl text-xl sm:mt-4">
				Just random posts on where you can find me, and what I am working on.
			</p>
		</div>
		<div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
			{#each postsPreview as postPreview (postPreview.slug)}
				<div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
					<div class="shrink-0">
						<a href={`/posts/${postPreview.slug.current}`}>
							<img
								class="h-48 w-full object-cover"
								src={postPreview.imageUrl?.toString()}
								alt="Blog Photo"
								width="413"
								height="192"
							/>
						</a>
					</div>
					<div class="flex flex-1 flex-col justify-between bg-white p-6">
						<div class="flex-1">
							<p class="text-blue-light text-sm font-medium">
								<a href="/" class="hover:underline">
									<span>Article</span>
								</a>
							</p>
							<a href={`/posts/${postPreview.slug.current}`} class="mt-2 block">
								<p class="text-gray-dark text-xl font-semibold">
									{postPreview.title}
								</p>
								<p class="text-gray-medium mt-3 text-base">
									{postPreview.excerpt}
								</p>
							</a>
						</div>
						<div class="mt-6 flex items-center">
							<div class="flex-shrink-0">
								<a href="/about">
									<span class="sr-only">{postPreview.author}</span>
									<Avatar />
								</a>
							</div>
							<div class="ml-3">
								<p class="text-gray-dark text-sm font-medium">
									<a href="/about" class="hover:underline">
										{postPreview.author}
									</a>
								</p>
								<div class="text-gray-medium flex space-x-1 text-sm">
									<time dateTime={postPreview.datetime?.toString()}>
										{formatBlogDate(postPreview.publishedAt, MONTH_FORMAT.ABBREVIATED_MONTH)}
									</time>
									<span aria-hidden="true">&middot;</span>
									<span>{postPreview.readingTime} read</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
