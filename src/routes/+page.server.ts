import type { PageServerLoad } from './$types';
import { getPostsPreview, getQualifications, sanityApiStore } from '$lib/stores/sanityDataStore';
import { getAllRepos, getPinnedRepos, githubApiStore } from '$lib/stores/githubDataStore';

export const load: PageServerLoad = async () => {
	const sanityState = sanityApiStore.get();
	const githubState = githubApiStore.get();
	const promises = [];

	if (!sanityState.qualifications?.data) {
		promises.push(getQualifications());
	}
	if (!sanityState.postsPreview?.data) {
		promises.push(getPostsPreview());
	}
	if (!githubState.allRepos?.data) {
		promises.push(getAllRepos());
	}
	if (!githubState.pinnedRepos?.data) {
		promises.push(getPinnedRepos());
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
