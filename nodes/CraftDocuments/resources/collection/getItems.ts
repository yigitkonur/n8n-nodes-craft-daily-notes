/**
 * COLLECTION GET ITEMS OPERATION
 * GET /collections/{collectionId}/items - Retrieve items from a collection
 * 
 * Same as Daily Notes API - no differences
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCollectionGetItems = { operation: ['getItems'], resource: ['collection'] };

export const collectionGetItemsDescription: INodeProperties[] = [
	// Collection ID - dynamic dropdown
	{
		displayName: 'Collection Name or ID',
		name: 'collectionId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
		default: '',
		required: true,
		description: 'Select a collection from your documents. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: { show: showOnlyForCollectionGetItems },
	},
	// Max Depth
	{
		displayName: 'Max Depth',
		name: 'maxDepth',
		type: 'number',
		typeOptions: {
			minValue: -1,
			maxValue: 10,
		},
		default: -1,
		description:
			'Maximum depth of nested content to fetch. -1 for all descendants, 0 for only item properties.',
		displayOptions: { show: showOnlyForCollectionGetItems },
		routing: {
			send: {
				type: 'query',
				property: 'maxDepth',
			},
		},
	},
];
