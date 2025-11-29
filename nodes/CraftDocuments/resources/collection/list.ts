/**
 * COLLECTION LIST OPERATION
 * GET /collections - List all collections across documents
 * 
 * KEY DIFFERENCE: Uses documentIds filter instead of date range
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCollectionList = { operation: ['list'], resource: ['collection'] };

export const collectionListDescription: INodeProperties[] = [
	// Filter by Documents
	{
		displayName: 'Filter by Documents',
		name: 'filterByDocuments',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForCollectionList },
		description: 'Whether to filter collections by specific documents',
	},
	{
		displayName: 'Document IDs',
		name: 'documentIds',
		type: 'string',
		default: '',
		placeholder: 'doc-123, doc-456 or ["doc-123", "doc-456"]',
		description: 'Document IDs to filter collections. Provide as comma-separated values or JSON array.',
		displayOptions: {
			show: {
				...showOnlyForCollectionList,
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
			{ name: 'Include', value: 'include', description: 'Only include collections from specified documents' },
			{ name: 'Exclude', value: 'exclude', description: 'Exclude collections from specified documents' },
		],
		default: 'include',
		description: 'Whether to include or exclude the specified documents',
		displayOptions: {
			show: {
				...showOnlyForCollectionList,
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
