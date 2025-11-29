/**
 * CRAFT DAILY NOTES NODE
 * Fully declarative node for Craft Daily Notes API
 * Uses preSend hooks for complex operations like markdown block building
 */
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

// Resource descriptions
import { blockDescription } from './resources/block';
import { taskDescription } from './resources/task';
import { collectionDescription } from './resources/collection';
import { searchDescription } from './resources/search';

// Load options methods
import { getCollections } from './loadOptions/getCollections';

export class CraftDailyNotes implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Craft Daily Notes',
		name: 'craftDailyNotes',
		icon: { light: 'file:../../icons/craft.svg', dark: 'file:../../icons/craft.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Craft Daily Notes API - manage blocks, tasks, collections, and search',
		defaults: { name: 'Craft Daily Notes' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'craftDailyNotesApi',
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
						name: 'Block',
						value: 'block',
						description: 'Manage content blocks in daily notes',
					},
					{
						name: 'Task',
						value: 'task',
						description: 'Manage tasks across daily notes',
					},
					{
						name: 'Collection',
						value: 'collection',
						description: 'Manage collections (database-like structures)',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search across daily notes',
					},
				],
				default: 'block',
			},

			// Spread all resource descriptions
			...blockDescription,
			...taskDescription,
			...collectionDescription,
			...searchDescription,
		],
	};

	// Methods for dynamic dropdowns
	methods = {
		loadOptions: {
			getCollections,
		},
	};
}
