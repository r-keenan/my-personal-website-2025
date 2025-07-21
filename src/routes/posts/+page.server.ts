import type { PageServerLoad } from './$types';
import type { PostPreview } from '$lib/utils/types/types';
import { getPostsPreview } from '$lib/utils/repositories/sanityRepo';
import { formatImageUrl } from '$lib/utils/utilityFunctions';

export const load: PageServerLoad = async () => {
	const data: PostPreview[] = await getPostsPreview();

	let returnData = await Promise.all(
		data.map(async (post) => {
			// Only process if post has an image
			if (post.mainImage?.asset?._ref) {
				const imageUrl = await formatImageUrl(post.mainImage.asset._ref);
				return {
					...post,
					imageUrl
				};
			}
			return post;
		})
	);

	return {
		initialData: {
			postsPreview: returnData || []
		}
	};
};
