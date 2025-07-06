import type { PageServerLoad } from './$types';
import { getPostsPreview, getQualifications, sanityApiStore } from '$lib/stores/sanityDataStore';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const state = sanityApiStore.get();
	const promises = [];

	if (!state.qualifications?.data) {
		promises.push(getQualifications());
	}
	if (!state.postsPreview?.data) {
		promises.push(getPostsPreview());
	}

	if (promises.length > 0) {
		await Promise.all(promises);
	}

	return {
		initialData: {
			qualifications: sanityApiStore.get().qualifications.data || []
		}
	};
};
