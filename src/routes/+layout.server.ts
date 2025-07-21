import { getQualifications } from '$lib/utils/repositories/sanityRepo';
import type { Qualification } from '$lib/utils/types/types';

export const prerender = true;
export const csr = true;

export const load = async () => {
	const data: Qualification[] = await getQualifications();

	return {
		initialData: {
			qualifications: data?.[0] || []
		}
	};
};
