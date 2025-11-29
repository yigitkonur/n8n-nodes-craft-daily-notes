/**
 * BLOCK GET OPERATION
 * GET /blocks - Fetch content from documents
 * 
 * KEY DIFFERENCE: Uses 'id' parameter (required) instead of 'date'
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBlockGet = { operation: ['get'], resource: ['block'] };

export const blockGetDescription: INodeProperties[] = [
	// Document/Block ID - REQUIRED for multi-document API
	{
		displayName: 'Document or Block ID',
		name: 'blockId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'doc-123 or block-uuid',
		description: 'The ID of the document or block to fetch. Use "List Documents" to discover available document IDs.',
		displayOptions: { show: showOnlyForBlockGet },
		routing: {
			send: {
				type: 'query',
				property: 'id',
			},
		},
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
			'Maximum depth of nested content to fetch. -1 for all descendants, 0 for only the block itself.',
		displayOptions: { show: showOnlyForBlockGet },
		routing: {
			send: {
				type: 'query',
				property: 'maxDepth',
			},
		},
	},

	// Response Format
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		options: [
			{
				name: 'JSON (Structured)',
				value: 'json',
				description: 'Returns structured block data with IDs and properties',
			},
			{
				name: 'Markdown (Text)',
				value: 'markdown',
				description: 'Returns rendered markdown content',
			},
		],
		default: 'json',
		description: 'Format of the response',
		displayOptions: { show: showOnlyForBlockGet },
		routing: {
			request: {
				headers: {
					Accept: '={{ $value === "markdown" ? "text/markdown" : "application/json" }}',
				},
			},
		},
	},

	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: showOnlyForBlockGet },
		options: [
			{
				displayName: 'Fetch Metadata',
				name: 'fetchMetadata',
				type: 'boolean',
				default: false,
				description:
					'Whether to include metadata (comments, timestamps, authors) for the blocks',
				routing: {
					send: {
						type: 'query',
						property: 'fetchMetadata',
					},
				},
			},
		],
	},
];
