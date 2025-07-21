import { getSanityClient } from '$lib/clients/sanity';
import { MONTH_FORMAT } from '$lib/enums';
import {
	fullPostQuery,
	postsPreviewQuery,
	qualificationsPreviewQuery
} from '../queries/sanityQueries';
import type { PostPreview, Qualification, Post } from '../types/types';
import { formatBlogDate, formatImageUrl } from '../utilityFunctions';

export const getQualifications = async (): Promise<Qualification[]> => {
	const client = await getSanityClient();
	return await client.fetch(qualificationsPreviewQuery);
};

export const getPostsPreview = async (): Promise<PostPreview[]> => {
	const client = await getSanityClient();
	const posts = await client.fetch(postsPreviewQuery);

	const data = await Promise.all(
		posts.map(async (post: Post) => {
			// Only process if post has an image
			if (post.mainImage?.asset?._ref) {
				const imageUrl = await formatImageUrl(post.mainImage.asset._ref);
				return {
					...post,
					imageUrl
				};
			}
			return post;
		})
	);

	return data;
};

export const getPost = async (slug: string): Promise<Post> => {
	const client = await getSanityClient();
	const post = await client.fetch(fullPostQuery, { slug });

	let imageUrl = '';
	let publishedAt = '';

	if (post.mainImage?.asset?._ref) {
		imageUrl = await formatImageUrl(post.mainImage.asset._ref);
	}
	if (post.publishedAt) {
		publishedAt = formatBlogDate(post.publishedAt, MONTH_FORMAT.FULL_MONTH);
	}

	let data: Post = {
		...post,
		imageUrl,
		publishedAt
	};

	return data;
};
