/**
 * CRAFT DOCUMENTS NODE
 * Fully declarative node for Craft Multi-Document API
 * Uses preSend hooks for complex operations like markdown block building
 * 
 * Key differences from Daily Notes:
 * - Uses document IDs instead of dates
 * - Has GET /documents endpoint
 * - No Tasks resource
 * - Position uses pageId instead of date
 */
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

// Resource descriptions
import { documentDescription } from './resources/document';
import { blockDescription } from './resources/block';
import { collectionDescription } from './resources/collection';
import { searchDescription } from './resources/search';

// Load options methods
import { getDocuments } from './loadOptions/getDocuments';
import { getCollections } from './loadOptions/getCollections';

export class CraftDocuments implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Craft Documents',
		name: 'craftDocuments',
		icon: { light: 'file:../../icons/craft.svg', dark: 'file:../../icons/craft.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Craft Multi-Document API - manage documents, blocks, collections, and search',
		defaults: { name: 'Craft Documents' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'craftDocumentsApi',
				required: true,
			},
		],

		// Request defaults - baseURL comes from credentials
		requestDefaults: {
			baseURL: '={{$credentials.apiUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Document',
						value: 'document',
						description: 'List and manage documents',
					},
					{
						name: 'Block',
						value: 'block',
						description: 'Manage content blocks in documents',
					},
					{
						name: 'Collection',
						value: 'collection',
						description: 'Manage collections (database-like structures)',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search across documents',
					},
				],
				default: 'document',
			},

			// Spread all resource descriptions
			...documentDescription,
			...blockDescription,
			...collectionDescription,
			...searchDescription,
		],
	};

	// Methods for dynamic dropdowns
	methods = {
		loadOptions: {
			getDocuments,
			getCollections,
		},
	};
}
