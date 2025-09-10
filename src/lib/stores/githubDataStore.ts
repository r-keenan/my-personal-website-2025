import { updated } from '$app/state';
import { githubClient } from '$lib/clients/github';
import type { GitHubRepo, ResourceState } from '$lib/utils/types/types';
import type { AxiosInstance } from 'axios';
import { writable } from 'svelte/store';

type StoreState = {
	pinnedRepos: ResourceState<GitHubRepo[]>;
	allRepos: ResourceState<GitHubRepo[]>;
};

const initialState: StoreState = {
	pinnedRepos: {
		data: null,
		loading: false,
		error: null
	},
	allRepos: {
		data: null,
		loading: false,
		error: null
	}
};

const store = writable<StoreState>(initialState);

export const githubApiStore = {
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

export async function getPinnedRepos(): Promise<GitHubRepo[]> {
	store.update((state) => ({
		...state,
		pinnedRepos: { ...state.pinnedRepos, loading: true, error: null }
	}));

	try {
		const client = await githubClient();
		const query = `
			query {
				user(login: "r-keenan") {
					pinnedItems(first: 6, types: [REPOSITORY]) {
						edges {
							node {
								... on Repository {
									name
									nameWithOwner
									url
									description
									primaryLanguage {
										name
									}
									updatedAt
									createdAt
									owner {
										login
									}
								}
							}
						}
					}
				}
			}
		`;
		const response = await client.post('/graphql', {
			query
		});

		const pinnedItems = response.data.data.user.pinnedItems.edges;

		const githubRepos: GitHubRepo[] = pinnedItems.map((edge: any) => ({
			url: edge.node.url,
			name: edge.node.name,
			author: edge.node.owner.login,
			language: edge.node.primaryLanguage?.name || '',
			description: edge.node.description,
			updatedAt: edge.node.updatedAt,
			createdAt: edge.node.createdAt
		}));

		store.update((state) => ({
			...state,
			pinnedRepos: { data: githubRepos, loading: false, error: null }
		}));

		return githubRepos;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		store.update((state) => ({
			...state,
			pinnedRepos: { ...state.pinnedRepos, loading: false, error: errorMessage }
		}));

		throw error;
	}
}

export async function getAllRepos(): Promise<GitHubRepo[]> {
	store.update((state) => ({
		...state,
		allRepos: { ...state.allRepos, loading: true, error: null }
	}));

	try {
		const client = await githubClient();
		const response = await client.get('/users/r-keenan/repos', {
			params: {
				sort: 'updated',
				type: 'owner',
				per_page: 100
			}
		});

		const githubRepos: GitHubRepo[] = response.data.map((repo: any) => ({
			url: repo.html_url,
			name: repo.full_name,
			author: repo.owner.login,
			language: repo.language,
			description: '',
			updatedAt: repo.updated_at,
			createdAt: repo.created_at
		}));

		store.update((state) => ({
			...state,
			allRepos: { data: githubRepos, loading: false, error: null }
		}));

		return githubRepos;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		store.update((state) => ({
			...state,
			allRepos: { ...state.allRepos, loading: false, error: errorMessage }
		}));

		throw error;
	}
}
