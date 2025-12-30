/**
 * DOCUMENT LIST OPERATION
 * GET /documents - List all accessible documents
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDocumentList = { operation: ['list'], resource: ['document'] };

export const documentListDescription: INodeProperties[] = [
	// Options collection for document list parameters
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: showOnlyForDocumentList },
		options: [
			{
				displayName: 'Fetch Metadata',
				name: 'fetchMetadata',
				type: 'boolean',
				default: false,
				description: 'Whether to include metadata (lastModifiedAt, createdAt, clickableLink) in the response',
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
