/**
 * BLOCK MOVE OPERATION
 * PUT /blocks/move - Move blocks to reorder or move between documents
 * 
 * KEY DIFFERENCE: Uses 'pageId' in position instead of 'date'
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBlockMove = { operation: ['move'], resource: ['block'] };

export const blockMoveDescription: INodeProperties[] = [
	// Block IDs to move
	{
		displayName: 'Block IDs',
		name: 'blockIds',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'ID1, ID2, ID3 or ["ID1", "ID2"]',
		description: 'Block IDs to move. Provide as comma-separated values or JSON array.',
		displayOptions: { show: showOnlyForBlockMove },
		routing: {
			send: {
				type: 'body',
				property: 'blockIds',
				// Safely parse as JSON array or split by comma
				value:
					'={{ $value && $value.trim().startsWith("[") ? (() => { try { return JSON.parse($value); } catch { return $value.split(",").map(id => id.trim()).filter(id => id); } })() : ($value ? $value.split(",").map(id => id.trim()).filter(id => id) : []) }}',
			},
		},
	},

	// Position - KEY DIFFERENCE: Uses pageId instead of date
	{
		displayName: 'Position',
		name: 'position',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Position',
		displayOptions: { show: showOnlyForBlockMove },
		options: [
			{
				name: 'positionValues',
				displayName: 'Position',
				values: [
					{
						displayName: 'Position Type',
						name: 'position',
						type: 'options',
						options: [
							{ name: 'End', value: 'end', description: 'Move to the end of the document' },
							{ name: 'Start', value: 'start', description: 'Move to the start of the document' },
							{ name: 'Before', value: 'before', description: 'Move before a specific block' },
							{ name: 'After', value: 'after', description: 'Move after a specific block' },
						],
						default: 'end',
					},
					{
						displayName: 'Target Document Name or ID',
						name: 'pageId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDocuments',
						},
						default: '',
						required: true,
						description: 'Select a document to move the blocks to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Reference Block ID',
						name: 'referenceBlockId',
						type: 'string',
						default: '',
						placeholder: 'Block ID (UUID)',
						description: 'The block ID to position relative to (required for before/after)',
						displayOptions: {
							show: {
								position: ['before', 'after'],
							},
						},
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'position',
				// KEY DIFFERENCE: Uses pageId instead of date
				value:
					'={{ $value.positionValues ? { position: $value.positionValues.position, pageId: $value.positionValues.pageId, ...(["before", "after"].includes($value.positionValues.position) && $value.positionValues.referenceBlockId ? { siblingId: $value.positionValues.referenceBlockId } : {}) } : { position: "end", pageId: "" } }}',
			},
		},
	},
];
