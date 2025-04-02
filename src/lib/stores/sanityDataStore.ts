import sanityClient from '$lib/clients/sanity';
import {
	fullPostQuery,
	postsPreviewQuery,
	qualificationsPreviewQuery
} from '$lib/utils/queries/sanityQueries';
import type { Post, PostPreview, ResourceState, Qualification } from '$lib/utils/types/types';
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
		const data: Qualification[] = await sanityClient.fetch(qualificationsPreviewQuery);

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
		const data: PostPreview[] = await sanityClient.fetch(postsPreviewQuery);

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

export async function getPost(): Promise<Post> {
	store.update((state) => ({
		...state,
		post: { ...state.post, loading: true, error: null }
	}));

	try {
		const data: Post = await sanityClient.fetch(fullPostQuery);

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
