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
	// Process images etc...
	return posts;
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

	let data: Post;

	return (data = { ...post, imageUrl, publishedAt });
};
