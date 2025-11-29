/**
 * DOCUMENT LIST OPERATION
 * GET /documents - List all accessible documents
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDocumentList = { operation: ['list'], resource: ['document'] };

export const documentListDescription: INodeProperties[] = [
	// No additional parameters needed for listing documents
	// The endpoint returns all accessible documents
	{
		displayName: 'Info',
		name: 'listInfo',
		type: 'notice',
		default: '',
		displayOptions: { show: showOnlyForDocumentList },
		description:
			'Returns all documents accessible through this connection with their IDs, titles, and deletion status',
	},
];
