import { sanityClient } from '$lib/clients/sanity';
import { getPost, getPostsPreview } from '$lib/utils/repositories/sanityRepo';
import type { Post, PostPreview } from '$lib/utils/types/types';
import type { EntryGenerator, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends(`posts:${params.slug}`);
	const { slug } = params;

	const data: Post = await getPost(slug);

	return {
		initialData: {
			post: data || []
		}
	};
};

type PostSlug = { slug: string };

export const entries: EntryGenerator = async () => {
	const data: PostPreview[] = await getPostsPreview();

	const postSlugs: PostSlug[] = [];
	data?.map((post: PostPreview) => {
		postSlugs.push({ slug: post.slug.current });
	});

	return postSlugs;
};
