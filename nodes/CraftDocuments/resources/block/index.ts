/**
 * BLOCK RESOURCE INDEX
 * Operations: Get, Insert, Update, Delete, Move, Search
 */
import type { INodeProperties } from 'n8n-workflow';

import { blockGetDescription } from './get';
import { blockInsertDescription, blockInsertPreSend } from './insert';
import { blockUpdateDescription } from './update';
import { blockDeleteDescription } from './delete';
import { blockMoveDescription } from './move';
import { blockSearchDescription } from './search';

const showOnlyForBlocks = { resource: ['block'] };

export const blockDescription: INodeProperties[] = [
	// OPERATION SELECTOR
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForBlocks },
		options: [
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete blocks from a document',
				description: 'Delete blocks by their IDs',
				routing: {
					request: {
						method: 'DELETE',
						url: '/blocks',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get blocks from a document',
				description: 'Fetch content from documents by document or block ID',
				routing: {
					request: {
						method: 'GET',
						url: '/blocks',
					},
				},
			},
			{
				name: 'Insert',
				value: 'insert',
				action: 'Insert blocks into a document',
				description: 'Insert content into a document',
				routing: {
					request: {
						method: 'POST',
						url: '/blocks',
					},
					send: {
						preSend: [blockInsertPreSend],
					},
				},
			},
			{
				name: 'Move',
				value: 'move',
				action: 'Move blocks',
				description: 'Move blocks to reorder or move between documents',
				routing: {
					request: {
						method: 'PUT',
						url: '/blocks/move',
					},
				},
			},
			{
				name: 'Search in Document',
				value: 'searchInDocument',
				action: 'Search in a specific document',
				description: 'Search content within a specific document using regex',
				routing: {
					request: {
						method: 'GET',
						url: '/blocks/search',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update blocks in a document',
				description: 'Update content in documents',
				routing: {
					request: {
						method: 'PUT',
						url: '/blocks',
					},
				},
			},
		],
		default: 'get',
	},

	// Spread operation-specific fields
	...blockGetDescription,
	...blockInsertDescription,
	...blockUpdateDescription,
	...blockDeleteDescription,
	...blockMoveDescription,
	...blockSearchDescription,
];
