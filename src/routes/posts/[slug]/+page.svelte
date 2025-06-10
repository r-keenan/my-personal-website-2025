<script lang="ts">
	import Breadcrumb from '$components/Breadcrumb.svelte';
	import type { Post } from '$lib/utils/types/types';

	export let data;
	const { post } = data.initialData as { post: Post };
</script>

<svelte:head>
	<title>{post.title} | Ross Keenan</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content={post.imageUrl?.toString()} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content={post.imageUrl?.toString()} />
	<link rel="canonical" href={`https://rosskeenan.com/posts/${post.slug.current}`} />
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-white pt-20 sm:mt-10 md:pt-10">
	<div class="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
		<div class="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true"></div>
	</div>
	<div class="relative mb-10 px-4 sm:mb-20 sm:px-6 md:mb-32 lg:mb-40 lg:px-8 lg:py-5">
		<Breadcrumb title={post.title} slug={post.slug.current} />
		<div class="mx-auto max-w-4xl">
			<div class="pt-24">
				<img
					class="h-48 w-full rounded-md object-cover"
					src={post.imageUrl?.toString()}
					alt=""
					width="413"
					height="192"
				/>
			</div>
			<h1>
				<span
					class="text-gray-dark mt-12 block text-center text-base font-semibold tracking-wide uppercase"
				></span>
				<span
					class="mt-2 block text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
				>
					{post.title}
				</span>
			</h1>
			<p class="text-gray-medium mt-5 text-center text-2xl">
				{post.excerpt}
			</p>
			<div class="text-gray-medium pt-3 text-center text-xl">
				<time dateTime={post.datetime?.toString()}>
					{post.publishedAt}
				</time>
			</div>
		</div>
		<div class="mx-auto mt-10 max-w-4xl">
			<div class="prose prose-indigo prose-lg text-gray-medium mx-auto">
				{#each post.body as postBody (postBody._key)}
					<div class="mb-4">
						<p>{postBody.children[0].text}</p>
					</div>
				{/each}
			</div>

			<div class="my-10 text-center">
				<a
					href={post.url?.toString()}
					class="text-blue-light text-base font-medium"
					target="_blank"
					rel="noreferrer"
				>
					{post.urlDescription}
				</a>
			</div>
			<div class="my-1 text-center">
				<a href="/posts" class="text-blue-light text-base font-medium">
					<span aria-hidden="true"> &larr;</span> Back to Posts
				</a>
			</div>
		</div>
	</div>
</div>
