import type { PageServerLoad } from './$types';
import type { PostPreview } from '$lib/utils/types/types';
import { getPostsPreview } from '$lib/utils/repositories/sanityRepo';

export const load: PageServerLoad = async () => {
	const data: PostPreview[] = await getPostsPreview();

	return {
		initialData: {
			postsPreview: data || []
		}
	};
};
