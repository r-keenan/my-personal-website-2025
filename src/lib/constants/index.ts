import LinkedInIcon from '$components/LinkedInIcon.svelte';
import GitHubIcon from '$components/GitHubIcon.svelte';
import {
	ApiKeyOutline,
	BookOpenOutline,
	CodeOutline,
	CogOutline,
	DatabaseOutline,
	ServerOutline,
	TerminalOutline,
	WindowOutline
} from 'flowbite-svelte-icons';

import type { Skill, SocialIcon } from '$lib/utils/types/types';

export const oneHour: number = 60 * 60;
export const oneDay: number = 60 * 60 * 24;

export const monthsAbbreviated: string[] = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

export const monthsFull: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const skills: Skill[] = [
	{
		name: 'Front End Development',
		icon: WindowOutline,
		listItems: [
			'HTML5',
			'CSS3',
			'JavaScript (ES6)',
			'TypeScript',
			'Svelte/Sveltekit',
			'Next.js',
			'React',
			'Vue.js',
			'Angular',
			'Tailwind CSS'
		]
	},
	{
		name: 'Backend Development',
		icon: ServerOutline,
		listItems: [
			'C#/.Net',
			'Node.js/Express.js',
			'SQL',
			'Python',
			'Nest.js',
			'Java',
			'PHP',
			'Ruby on Rails',
			'Linux Servers'
		]
	},
	{
		name: 'Object Relational Mappers (ORMs)',
		icon: ServerOutline,
		listItems: ['Entity Framwork Core', 'Prisma', 'Dapper', 'Active Record']
	},
	{
		name: 'Data Engineering/Analysis',
		icon: TerminalOutline,
		listItems: [
			'Web Scrapers (Python)',
			'Extract, Transform, Load (ETL)',
			'Data Cleansing',
			'Data Visualizations',
			'Reporting Software'
		]
	},
	{
		name: 'API/API Integrations',
		icon: ApiKeyOutline,
		listItems: ['RESTful APIs', 'Microservices', 'GraphQL APIs']
	},
	{
		name: 'Database Development & Object Storage',
		icon: DatabaseOutline,
		listItems: [
			'Postgres',
			'Microsoft SQL Server',
			'MySQL',
			'MongoDB',
			'SQLite',
			'Amazon DynamoDB',
			'Azure SQL Database',
			'Azure Blob Storage',
			'Amazon S3'
		]
	},
	{
		name: 'CMS Development',
		icon: CogOutline,
		listItems: ['Sanity', 'Shopify', 'WordPress']
	},
	{
		name: 'Development Tools',
		icon: CodeOutline,
		listItems: [
			'Neovim',
			'Visual Studio Code',
			'JetBrains Rider',
			'Visual Studio',
			'IntelliJ',
			'Microsoft SQL Server Management Studio',
			'Azure Data Studio',
			'Datagrip',
			'Webstorm'
		]
	},
	{
		name: 'Tools/Applications',
		icon: CodeOutline,
		listItems: [
			'Jira',
			'Confluence',
			'Basecamp',
			'Kanban',
			'Git',
			'GitHub',
			'GitLab',
			'Bitbucket',
			'Swagger',
			'Postman',
			'Azure DevOps (ADO)'
		]
	},
	{
		name: 'Cloud Platforms',
		icon: ServerOutline,
		listItems: ['AWS', 'Azure', 'Digital Ocean', 'Vercel']
	},
	{
		name: 'Methodologies',
		icon: BookOpenOutline,
		listItems: ['Agile', 'Kanban', 'Scrum', 'SAFe', 'Waterfall']
	}
];

export const socials: SocialIcon[] = [
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/r-keenan',
		target: '_blank',
		rel: 'noopener noreferrer',
		icon: LinkedInIcon
	},
	{
		name: 'GitHub',
		href: 'https://github.com/r-keenan',
		target: '_blank',
		rel: 'noopener noreferrer',
		icon: GitHubIcon
	}
];
