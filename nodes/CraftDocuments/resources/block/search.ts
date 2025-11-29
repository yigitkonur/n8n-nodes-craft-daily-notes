/**
 * BLOCK SEARCH OPERATION
 * GET /blocks/search - Search content within a specific document
 * 
 * KEY DIFFERENCE: Uses 'documentId' parameter instead of 'date'
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBlockSearch = { operation: ['searchInDocument'], resource: ['block'] };

export const blockSearchDescription: INodeProperties[] = [
	// Document ID - KEY DIFFERENCE from Daily Notes
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'doc-123',
		description: 'The document ID to search within. Use "List Documents" to find available IDs.',
		displayOptions: { show: showOnlyForBlockSearch },
		routing: {
			send: {
				type: 'query',
				property: 'documentId',
			},
		},
	},

	// Search Pattern
	{
		displayName: 'Search Pattern',
		name: 'pattern',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'meeting|agenda',
		description: 'The search pattern. Supports NodeJS regular expressions.',
		displayOptions: { show: showOnlyForBlockSearch },
		routing: {
			send: {
				type: 'query',
				property: 'pattern',
			},
		},
	},

	// Additional Options
	{
		displayName: 'Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: showOnlyForBlockSearch },
		options: [
			{
				displayName: 'Case Sensitive',
				name: 'caseSensitive',
				type: 'boolean',
				default: false,
				description: 'Whether the search should be case sensitive',
				routing: {
					send: {
						type: 'query',
						property: 'caseSensitive',
					},
				},
			},
			{
				displayName: 'Blocks Before',
				name: 'beforeBlockCount',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 5,
				},
				default: 0,
				description: 'Number of blocks to include before each match for context',
				routing: {
					send: {
						type: 'query',
						property: 'beforeBlockCount',
					},
				},
			},
			{
				displayName: 'Blocks After',
				name: 'afterBlockCount',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 5,
				},
				default: 0,
				description: 'Number of blocks to include after each match for context',
				routing: {
					send: {
						type: 'query',
						property: 'afterBlockCount',
					},
				},
			},
		],
	},
];
