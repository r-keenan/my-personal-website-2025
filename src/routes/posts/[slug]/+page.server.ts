import type { EntryGenerator, PageServerLoad } from './$types';
import {
	getPost,
	getPostsPreview,
	getQualifications,
	sanityApiStore
} from '$lib/stores/sanityDataStore';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends(`posts:${params.slug}`);
	const state = sanityApiStore.get();
	const promises = [];
	const { slug } = params;

	if (!state.qualifications?.data) {
		promises.push(getQualifications());
	}
	if (!state.postsPreview?.data) {
		promises.push(getPostsPreview());
	}
	promises.push(getPost(slug));

	if (promises.length > 0) {
		await Promise.all(promises);
	}

	return {
		initialData: {
			post: sanityApiStore.get().post.data || []
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
