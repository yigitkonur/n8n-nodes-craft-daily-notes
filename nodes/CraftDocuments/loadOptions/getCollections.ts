/**
 * Load options method for fetching collections
 * Used by collection selector dropdowns
 */
import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { craftApiRequest } from '../shared/transport';

interface CollectionItem {
	key: string;
	name: string;
	documentId?: string;
	schema?: {
		name: string;
		properties: unknown[];
	};
}

interface CollectionsResponse {
	items: CollectionItem[];
}

/**
 * Fetch all collections from the Craft Documents API
 * Returns options for collection selector dropdowns
 */
export async function getCollections(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const response = (await craftApiRequest.call(
		this,
		'GET',
		'/collections',
	)) as unknown as CollectionsResponse;

	if (!response?.items || !Array.isArray(response.items)) {
		return [];
	}

	return response.items.map((collection) => ({
		name: collection.name || `Collection ${collection.key}`,
		value: collection.key,
		description: collection.documentId
			? `In document: ${collection.documentId}`
			: `ID: ${collection.key}`,
	}));
}
