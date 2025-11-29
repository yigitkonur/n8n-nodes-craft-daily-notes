/**
 * COLLECTION ADD ITEMS OPERATION
 * POST /collections/{collectionId}/items - Add items to a collection
 * 
 * Same as Daily Notes API - no differences
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCollectionAddItems = { operation: ['addItems'], resource: ['collection'] };

export const collectionAddItemsDescription: INodeProperties[] = [
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
		displayOptions: { show: showOnlyForCollectionAddItems },
	},
	// Items to add
	{
		displayName: 'Items',
		name: 'items',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Item',
		displayOptions: { show: showOnlyForCollectionAddItems },
		options: [
			{
				name: 'itemValues',
				displayName: 'Item',
				values: [
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						required: true,
						description: 'The title for the new item',
					},
					{
						displayName: 'Properties (JSON)',
						name: 'properties',
						type: 'json',
						default: '{}',
						description: 'Additional properties for the item as JSON object. Schema depends on collection.',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'items',
				value:
					'={{ $value.itemValues ? $value.itemValues.map(item => ({ title: item.title, properties: typeof item.properties === "string" ? JSON.parse(item.properties || "{}") : (item.properties || {}) })) : [] }}',
			},
		},
	},
];
