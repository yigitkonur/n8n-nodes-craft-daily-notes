/**
 * Load options method for fetching collections
 * Used by collection selector dropdowns
 */
import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

import { craftApiRequest } from '../shared/transport';

interface CollectionItem {
	id: string;
	name: string;
	itemCount?: number;
	dailyNoteDate?: string;
}

interface CollectionsResponse {
	items: CollectionItem[];
}

/**
 * Fetch all collections from the Craft Daily Notes API
 * Returns options for collection selector dropdowns
 *
 * @returns Array of collection options, or empty array on error
 */
export async function getCollections(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const response = (await craftApiRequest.call(
			this,
			'GET',
			'/collections',
		)) as unknown as CollectionsResponse;

		if (!response?.items || !Array.isArray(response.items)) {
			return [];
		}

		return response.items.map((collection) => ({
			name: collection.name || `Collection ${collection.id}`,
			value: collection.id,
			description: collection.dailyNoteDate
				? `Date: ${collection.dailyNoteDate}`
				: `ID: ${collection.id}`,
		}));
	} catch {
		// Return empty array on error - n8n will show "No options available"
		return [];
	}
}
