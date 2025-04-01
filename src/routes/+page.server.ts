import { type Qualification } from '$lib/utils/types';
import sanityClient from '$lib/clients/sanity';
import type { PageServerLoad } from './$types';

// This will not allow me to use a constant from utils. It throws an error that the value must be statically analyzable
// 86400 = seconds in a day
export const revalidate = 86_400;

export const load: PageServerLoad = async () => {
	const qualificationsPreviewQuery = `*[_type == "qualification"] | order(order)`;
	const sanityData: Qualification[] = await sanityClient.fetch(qualificationsPreviewQuery);
	return { sanityData };
};
