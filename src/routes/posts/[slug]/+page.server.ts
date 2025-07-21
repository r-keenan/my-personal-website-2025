import { sanityClient } from '$lib/clients/sanity';
import type { EntryGenerator, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends(`posts:${params.slug}`);
	const { slug } = params;

	const client = await sanityClient();
	const data = await client.fetch(slug);

	return {
		initialData: {
			post: data || []
		}
	};
};

type PostSlug = { slug: string };

export const entries: EntryGenerator = () => {
	const state = sanityApiStore.get().postsPreview;

	const postSlugs: PostSlug[] = [];
	state.data?.map((post) => {
		postSlugs.push({ slug: post.slug.current });
	});

	return postSlugs;
};
