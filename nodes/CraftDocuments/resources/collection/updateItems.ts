/**
 * COLLECTION UPDATE ITEMS OPERATION
 * PUT /collections/{collectionId}/items - Update items in a collection
 * 
 * Same as Daily Notes API - no differences
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCollectionUpdateItems = { operation: ['updateItems'], resource: ['collection'] };

export const collectionUpdateItemsDescription: INodeProperties[] = [
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
		displayOptions: { show: showOnlyForCollectionUpdateItems },
	},
	// Items to update
	{
		displayName: 'Items to Update',
		name: 'itemsToUpdate',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Item',
		displayOptions: { show: showOnlyForCollectionUpdateItems },
		options: [
			{
				name: 'itemValues',
				displayName: 'Item',
				values: [
					{
						displayName: 'Item ID',
						name: 'id',
						type: 'string',
						default: '',
						required: true,
						description: 'The ID of the item to update',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'New title for the item (leave empty to keep current)',
					},
					{
						displayName: 'Properties (JSON)',
						name: 'properties',
						type: 'json',
						default: '{}',
						description: 'Updated properties for the item as JSON object',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'itemsToUpdate',
				value:
					'={{ $value.itemValues ? $value.itemValues.map(item => { const obj = { id: item.id }; if (item.title) obj.title = item.title; obj.properties = typeof item.properties === "string" ? JSON.parse(item.properties || "{}") : (item.properties || {}); return obj; }) : [] }}',
			},
		},
	},
];
