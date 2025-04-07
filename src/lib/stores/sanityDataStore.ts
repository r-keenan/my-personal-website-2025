import { getSanityClient } from '$lib/clients/sanity';
import { MONTH_FORMAT } from '$lib/enums';
import {
	fullPostQuery,
	postsPreviewQuery,
	qualificationsPreviewQuery
} from '$lib/utils/queries/sanityQueries';
import type { Post, PostPreview, ResourceState, Qualification } from '$lib/utils/types/types';
import { formatBlogDate, formatImageUrl } from '$lib/utils/utilityFunctions';
import { writable } from 'svelte/store';

type StoreState = {
	postsPreview: ResourceState<PostPreview[]>;
	post: ResourceState<Post>;
	qualifications: ResourceState<Qualification[]>;
};

const initialState: StoreState = {
	postsPreview: {
		data: null,
		loading: false,
		error: null
	},
	post: {
		data: null,
		loading: false,
		error: null
	},
	qualifications: {
		data: null,
		loading: false,
		error: null
	}
};

const store = writable<StoreState>(initialState);

export const sanityApiStore = {
	subscribe: store.subscribe,

	// Method to update a specific slice of state
	update: (fn: (state: StoreState) => StoreState) => {
		store.update(fn);
	},

	// Method to get current state (for server use)
	get: () => {
		let currentState: StoreState | undefined;
		const unsubscribe = store.subscribe((state) => {
			currentState = state;
		});
		unsubscribe();
		return currentState as StoreState;
	}
};

export async function getQualifications(): Promise<Qualification[]> {
	store.update((state) => ({
		...state,
		qualifications: { ...state.qualifications, loading: true, error: null }
	}));

	try {
		const data: Qualification[] = await (await getSanityClient()).fetch(qualificationsPreviewQuery);

		store.update((state) => ({
			...state,
			qualifications: { data, loading: false, error: null }
		}));

		return data;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		store.update((state) => ({
			...state,
			qualifications: { ...state.qualifications, loading: false, error: errorMessage }
		}));

		throw error;
	}
}

export async function getPostsPreview(): Promise<PostPreview[]> {
	store.update((state) => ({
		...state,
		postsPreview: { ...state.postsPreview, loading: true, error: null }
	}));

	try {
		const apiData: PostPreview[] = await (await getSanityClient()).fetch(postsPreviewQuery);

		// Process each post to add the imageUrl
		const data = await Promise.all(
			apiData.map(async (post) => {
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

		store.update((state) => ({
			...state,
			postsPreview: { data, loading: false, error: null }
		}));

		return data;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		store.update((state) => ({
			...state,
			postsPreview: { ...state.postsPreview, loading: false, error: errorMessage }
		}));

		throw error;
	}
}

export async function getPost(slug: string): Promise<Post> {
	store.update((state) => ({
		...state,
		post: { ...state.post, loading: true, error: null }
	}));

	try {
		const apiData: Post = await (await getSanityClient()).fetch(fullPostQuery, { slug });

		let data;
		let imageUrl = '';
		let publishedAt = '';

		if (apiData.mainImage?.asset?._ref) {
			imageUrl = await formatImageUrl(apiData.mainImage.asset._ref);
		}
		if (apiData.publishedAt) {
			publishedAt = formatBlogDate(apiData.publishedAt, MONTH_FORMAT.FULL_MONTH);
		} else {
			data = apiData;
		}

		data = {
			...apiData,
			imageUrl,
			publishedAt
		};

		store.update((state) => ({
			...state,
			post: { data, loading: false, error: null }
		}));

		return data;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		store.update((state) => ({
			...state,
			post: { ...state.post, loading: false, error: errorMessage }
		}));

		throw error;
	}
}
