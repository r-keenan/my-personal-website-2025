import type { PageServerLoad } from './$types';
import { getAllRepos, getPinnedRepos, githubApiStore } from '$lib/stores/githubDataStore';

export const load: PageServerLoad = async () => {
	const state = githubApiStore.get();
	const promises = [];

	if (!state.pinnedRepos?.data) {
		promises.push(getPinnedRepos());
	}
	if (!state.allRepos?.data) {
		promises.push(getAllRepos());
	}

	if (promises.length > 0) {
		await Promise.all(promises);
	}

	return {
		initialData: {
			pinnedRepos: githubApiStore.get().pinnedRepos.data || [],
			allRepos: githubApiStore.get().allRepos.data || []
		}
	};
};
