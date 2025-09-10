import type { PageServerLoad } from './$types';
import { getAllRepos, getPinnedRepos, githubApiStore } from '$lib/stores/githubDataStore';
import type { Qualification } from '$lib/utils/types/types';
import { getQualifications } from '$lib/utils/repositories/sanityRepo';

export const load: PageServerLoad = async () => {
	const githubState = githubApiStore.get();
	const quals: Qualification[] = await getQualifications();
	const promises = [];

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
			qualifications: quals || []
		}
	};
};
