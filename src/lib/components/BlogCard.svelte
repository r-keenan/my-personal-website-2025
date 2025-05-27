<script lang="ts">
	import type { PostPreview } from '$lib/utils/types/types';
	import Avatar from '$components/Avatar.svelte';
	import { MONTH_FORMAT } from '$lib/enums/index.js';
	import { formatBlogDate } from '$lib/utils/utilityFunctions';

	let { postPreview }: { postPreview: PostPreview } = $props();
</script>

<div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
	<div class="shrink-0">
		<a href={`/posts/${postPreview.slug.current}`}>
			<img
				class="h-48 w-full object-cover"
				src={postPreview.imageUrl?.toString()}
				alt="Blog pic"
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
