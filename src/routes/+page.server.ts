import type { PageServerLoad } from './$types';
import type { Qualification } from '$lib/utils/types/types';
import { getQualifications } from '$lib/utils/repositories/sanityRepo';

export const load: PageServerLoad = async () => {
	const data: Qualification[] = await getQualifications();

	return {
		initialData: {
			qualifications: data?.[0] || []
		}
	};
};
