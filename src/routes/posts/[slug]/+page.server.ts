import type { PageServerLoad } from './$types';
import {
	getPost,
	getPostsPreview,
	getQualifications,
	sanityApiStore
} from '$lib/stores/sanityDataStore';

// This will not allow me to use a constant from utils. It throws an error that the value must be statically analyzable
// 86400 = seconds in a day
//export const revalidate = 86_400;

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
