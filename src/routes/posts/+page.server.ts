import type { PageServerLoad } from './$types';
import { getPostsPreview, getQualifications, sanityApiStore } from '$lib/stores/sanityDataStore';

// This will not allow me to use a constant from utils. It throws an error that the value must be statically analyzable
// 86400 = seconds in a day
//export const revalidate = 86_400;

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
			postsPreview: sanityApiStore.get().postsPreview.data || []
		}
	};
};
