/**
 * SEARCH RESOURCE INDEX
 * Operations: Search Across Documents
 * 
 * KEY DIFFERENCE: Uses GET /documents/search with documentIds filter
 * instead of GET /daily-notes/search with date range
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
				name: 'Search Across Documents',
				value: 'searchAcrossDocuments',
				action: 'Search across multiple documents',
				description:
					'Search content across multiple documents using relevance-based ranking',
				routing: {
					request: {
						method: 'GET',
						url: '/documents/search',
					},
				},
			},
		],
		default: 'searchAcrossDocuments',
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
				operation: ['searchAcrossDocuments'],
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
				operation: ['searchAcrossDocuments'],
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
				operation: ['searchAcrossDocuments'],
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

	// Filter by Documents - KEY DIFFERENCE from Daily Notes
	{
		displayName: 'Filter by Documents',
		name: 'filterByDocuments',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossDocuments'],
			},
		},
		description: 'Whether to filter search to specific documents',
	},
	{
		displayName: 'Document IDs',
		name: 'documentIds',
		type: 'string',
		default: '',
		placeholder: 'doc-123, doc-456 or ["doc-123", "doc-456"]',
		description: 'Document IDs to filter. Provide as comma-separated values or JSON array.',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossDocuments'],
				filterByDocuments: [true],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'documentIds',
				// Safely parse as JSON array or split by comma
				value: '={{ $value ? ($value.trim().startsWith("[") ? (() => { try { return JSON.parse($value); } catch { return $value.split(",").map(id => id.trim()).filter(id => id); } })() : $value.split(",").map(id => id.trim()).filter(id => id)) : undefined }}',
			},
		},
	},
	{
		displayName: 'Filter Mode',
		name: 'documentFilterMode',
		type: 'options',
		options: [
			{ name: 'Include', value: 'include', description: 'Only search in specified documents' },
			{ name: 'Exclude', value: 'exclude', description: 'Exclude specified documents from search' },
		],
		default: 'include',
		description: 'Whether to include or exclude the specified documents',
		displayOptions: {
			show: {
				...showOnlyForSearch,
				operation: ['searchAcrossDocuments'],
				filterByDocuments: [true],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'documentFilterMode',
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
				operation: ['searchAcrossDocuments'],
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
