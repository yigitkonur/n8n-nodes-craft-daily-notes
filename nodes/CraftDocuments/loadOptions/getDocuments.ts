/**
 * Load options method for fetching documents
 * Used by document selector dropdowns
 */
import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

import { craftApiRequest } from '../shared/transport';

interface DocumentItem {
	id: string;
	title: string;
	isDeleted?: boolean;
}

interface DocumentsResponse {
	items: DocumentItem[];
}

/**
 * Fetch all documents from the Craft Documents API
 * Returns options for document selector dropdowns
 *
 * @returns Array of document options, or empty array on error
 */
export async function getDocuments(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const response = (await craftApiRequest.call(
			this,
			'GET',
			'/documents',
		)) as unknown as DocumentsResponse;

		if (!response?.items || !Array.isArray(response.items)) {
			return [];
		}

		// Filter out deleted documents and map to options
		return response.items
			.filter((doc) => !doc.isDeleted)
			.map((doc) => ({
				name: doc.title || `Document ${doc.id}`,
				value: doc.id,
				description: `ID: ${doc.id}`,
			}));
	} catch {
		// Return empty array on error - n8n will show "No options available"
		return [];
	}
}
