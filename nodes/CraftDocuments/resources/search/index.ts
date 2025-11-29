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

	// Search Terms
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
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'include',
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
				value: '={{ $value ? ($value.startsWith("[") ? JSON.parse($value) : $value.split(",").map(id => id.trim())) : undefined }}',
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
];
