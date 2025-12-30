/**
 * Load options method for fetching blocks from a document
 * Used by block selector dropdowns
 */
import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

import { craftApiRequest } from '../shared/transport';

interface BlockItem {
	id: string;
	type: string;
	markdown?: string;
	textStyle?: string;
	content?: BlockItem[];
}

interface BlocksResponse {
	id: string;
	type: string;
	markdown?: string;
	textStyle?: string;
	content?: BlockItem[];
}

/**
 * Flatten nested block structure into a list of options
 * Uses indentation to show hierarchy
 */
function flattenBlocks(block: BlockItem, depth = 0): INodePropertyOptions[] {
	const indent = '  '.repeat(depth);
	const preview = block.markdown?.substring(0, 50) || block.id;
	const displayName = `${indent}${preview}${block.markdown && block.markdown.length > 50 ? '...' : ''}`;

	const options: INodePropertyOptions[] = [
		{
			name: displayName,
			value: block.id,
			description: `Type: ${block.type}${block.textStyle ? `, Style: ${block.textStyle}` : ''}`,
		},
	];

	// Recursively process child blocks
	if (block.content && Array.isArray(block.content)) {
		for (const child of block.content) {
			options.push(...flattenBlocks(child, depth + 1));
		}
	}

	return options;
}

/**
 * Fetch all blocks from a document
 * Returns options for block selector dropdowns
 *
 * @returns Array of block options, or empty array on error
 */
export async function getBlocks(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		// Get the document ID from the current node parameter
		const documentId = this.getNodeParameter('blockId', '') as string
			|| this.getNodeParameter('documentId', '') as string
			|| this.getNodeParameter('targetPageId', '') as string;

		if (!documentId) {
			return [{ name: 'Select a Document First', value: '', description: 'Choose a document to see its blocks' }];
		}

		const response = (await craftApiRequest.call(
			this,
			'GET',
			'/blocks',
			{ id: documentId, maxDepth: 2 },
		)) as unknown as BlocksResponse;

		if (!response?.id) {
			return [];
		}

		// Flatten the block tree into options
		return flattenBlocks(response);
	} catch {
		// Return empty array on error - n8n will show "No options available"
		return [];
	}
}
