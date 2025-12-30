/**
 * BLOCK UPDATE OPERATION
 * PUT /blocks - Update content in documents
 * 
 * Same as Daily Notes API - no differences
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBlockUpdate = { operation: ['update'], resource: ['block'] };

export const blockUpdateDescription: INodeProperties[] = [
	// Blocks to Update
	{
		displayName: 'Blocks to Update',
		name: 'blocksToUpdate',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Block',
		displayOptions: { show: showOnlyForBlockUpdate },
		options: [
			{
				name: 'blockValues',
				displayName: 'Block',
				values: [
					{
						displayName: 'Block Color (Hex)',
						name: 'color',
						type: 'color',
						default: '',
						placeholder: '#FF5733',
						description: 'Block highlight color in hex format (e.g.,	#FF5733). Leave empty to keep current.',
					},
					{
						displayName: 'Block ID',
						name: 'id',
						type: 'string',
						default: '',
							required:	true,
						placeholder: 'E21E3640-FBD2-4887-BD1B-B1FFE1781168',
						description: 'The UUID of the block to update',
					},
					{
						displayName: 'Font',
						name: 'font',
						type: 'options',
						options: [
							{
								name: "Don't Change",
								value: '',
								description: 'Keep current font',
							},
							{
								name: 'Mono',
								value: 'mono',
							},
							{
								name: 'Rounded',
								value: 'rounded',
							},
							{
								name: 'Serif',
								value: 'serif',
							},
							{
								name: 'System',
								value: 'system',
							},
						],
						default: '',
						description: 'The font family for the block',
					},
					{
						displayName: 'Indentation Level',
						name: 'indentationLevel',
						type: 'number',
						default: -1,
						description: 'Indentation level (0-5). Set to	-1 to keep current level.',
					},
					{
						displayName: 'List Style',
						name: 'listStyle',
						type: 'options',
						options: [
							{
								name: 'Bullet',
								value: 'bullet',
							},
							{
								name: 'Don\'t Change',
								value: '',
								description: 'Keep current list style',
							},
							{
								name: 'None',
								value: 'none',
							},
							{
								name: 'Numbered',
								value: 'numbered',
							},
							{
								name: 'Task',
								value: 'task',
							},
							{
								name: 'Toggle',
								value: 'toggle',
							},
					],
						default: '',
						description: 'The list style for the block',
					},
					{
						displayName: 'New Markdown',
						name: 'markdown',
						type: 'string',
						default: '',
						description: 'The new markdown content for the block',
					},
					{
						displayName: 'Text Style',
						name: 'textStyle',
						type: 'options',
						options: [
							{
								name: 'Body',
								value: 'body',
							},
							{
								name: 'Caption',
								value: 'caption',
							},
							{
								name: 'Card',
								value: 'card',
							},
							{
								name: 'Don\'t Change',
								value: '',
								description: 'Keep current text style',
							},
							{
								name: 'Heading 1',
								value: 'h1',
							},
							{
								name: 'Heading 2',
								value: 'h2',
							},
							{
								name: 'Heading 3',
								value: 'h3',
							},
							{
								name: 'Heading 4',
								value: 'h4',
							},
							{
								name: 'Page',
								value: 'page',
							},
					],
						default: '',
						description: 'The text style for the block. Code blocks are auto-detected from	```	markdown syntax.',
					},
			],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'blocks',
				// Include all optional fields only if explicitly set
				value:
					'={{ $value.blockValues ? $value.blockValues.map(b => { const block = { id: b.id }; if (b.markdown) block.markdown = b.markdown; if (b.textStyle && b.textStyle !== "") block.textStyle = b.textStyle; if (b.listStyle && b.listStyle !== "") block.listStyle = b.listStyle; if (b.font && b.font !== "") block.font = b.font; if (b.indentationLevel >= 0) block.indentationLevel = b.indentationLevel; if (b.color) block.decorations = [{ color: b.color }]; return block; }) : [] }}',
			},
		},
	},
];
