import type { PageServerLoad } from './$types';
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
