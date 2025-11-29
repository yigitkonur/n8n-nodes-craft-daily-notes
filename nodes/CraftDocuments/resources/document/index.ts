/**
 * DOCUMENT RESOURCE INDEX
 * Operations: List
 */
import type { INodeProperties } from 'n8n-workflow';

import { documentListDescription } from './list';

const showOnlyForDocument = { resource: ['document'] };

export const documentDescription: INodeProperties[] = [
	// OPERATION SELECTOR
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForDocument },
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List all documents',
				description: 'Retrieve all documents accessible through this connection',
				routing: {
					request: {
						method: 'GET',
						url: '/documents',
					},
				},
			},
		],
		default: 'list',
	},

	// Spread operation-specific fields
	...documentListDescription,
];
