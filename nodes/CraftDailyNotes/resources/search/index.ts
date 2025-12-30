/**
 * SEARCH RESOURCE INDEX
 * Operations: Search Across Daily Notes
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSearch = { resource: ['search'] };

export const searchDescription: INodeProperties[] = [
	// OPERATION SELECTOR
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSearch },
		options: [
			{
				name: 'Search Across Daily Notes',
				value: 'searchAcrossNotes',
				action: 'Search across multiple daily notes',
				description:
					'Search content across multiple daily notes using relevance-based ranking',
				routing: {
					request: {
						method: 'GET',
						url: '/daily-notes/search',
					},
				},
			},
		],
		default: 'searchAcrossNotes',
	},

	// Search Type Selector
	{
		displayName: 'Search Type',
		name: 'searchType',
		type: 'options',
		options: [
			{ name: 'Plain Text', value: 'plain', description: 'Search using plain text terms' },
			{ name: 'Regular Expression', value: 'regex', description: 'Search using RE2-compatible regex patterns' },
		],
		default: 'plain',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
			},
		},
	},

	// Search Terms (Plain Text)
	{
		displayName: 'Search Terms',
		name: 'include',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'project alpha',
		description: 'Search terms to include. Results are ranked by relevance (top 20).',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
				searchType: ['plain'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'include',
			},
		},
	},

	// Regex Pattern
	{
		displayName: 'Regex Pattern',
		name: 'regexps',
		type: 'string',
		default: '',
		required: true,
		placeholder: '\\d{4}-\\d{2}-\\d{2}|meeting|agenda',
		description: 'RE2-compatible regex pattern to search for. Use | for OR, \\d for digits, etc.',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
				searchType: ['regex'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'regexps',
			},
		},
	},

	// Date Range Options
	{
		displayName: 'Filter by Date Range',
		name: 'filterByDateRange',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
			},
		},
		description: 'Whether to filter search to a specific date range',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		default: '',
		placeholder: 'today, yesterday, or YYYY-MM-DD',
		description: 'Only search daily notes on or after this date',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
				filterByDateRange: [true],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'startDate',
				value: '={{ $value || undefined }}',
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'string',
		default: '',
		placeholder: 'today, tomorrow, or YYYY-MM-DD',
		description: 'Only search daily notes on or before this date',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
				filterByDateRange: [true],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'endDate',
				value: '={{ $value || undefined }}',
			},
		},
	},

	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'searchAdditionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossNotes'],
			},
		},
		options: [
			{
				displayName: 'Fetch Metadata',
				name: 'fetchMetadata',
				type: 'boolean',
				default: false,
				description: 'Whether to include lastModifiedAt and createdAt in search results',
				routing: {
					send: {
						type: 'query',
						property: 'fetchMetadata',
					},
				},
			},
		],
	},
];
