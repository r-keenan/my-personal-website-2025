import type { SanityDocument, Reference, Slug } from '@sanity/types';
import { type PortableTextBlock } from '@portabletext/types';
import type { LegacyComponentType } from 'svelte/legacy';

export type PostPreview = SanityDocument & {
	title: string;
	excerpt: string;
	mainImage: {
		_type: 'image';
		asset: Reference;
	};
	author: string;
	createdAt: string | null;
	slug: Slug;
	dateTime: string | null;
	publishedAt: string;
	readingTime: string;
	imageUrl: string;
};

export type Post = PostPreview & {
	urlDescription: string;
	url: string;
	body: PortableTextBlock[];
};

export type Qualification = SanityDocument & {
	name: string;
	description: PortableTextBlock[];
	category: string;
};

export type ResourceState<T> = {
	data: T | null;
	loading: boolean;
	error: string | null;
};

export type Skill = {
	name: string;
	icon: any;
	listItems: string[];
};
export type SocialIcon = {
	name: string;
	href: string;
	target: string;
	rel: string;
	icon: string | LegacyComponentType;
};
