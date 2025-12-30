/**
 * TASK DELETE OPERATION
 * DELETE /tasks - Delete tasks by their IDs
 */
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTaskDelete = { operation: ['delete'], resource: ['task'] };

export const taskDeleteDescription: INodeProperties[] = [
	// Task IDs to delete
	{
		displayName: 'Task IDs',
		name: 'taskIds',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'ID1, ID2, ID3 or ["ID1", "ID2"]',
		description: 'Task IDs to delete. Provide as comma-separated values or JSON array.',
		displayOptions: { show: showOnlyForTaskDelete },
		routing: {
			send: {
				type: 'body',
				property: 'idsToDelete',
				// Safely parse as JSON array or split by comma
				value:
					'={{ $value && $value.trim().startsWith("[") ? (() => { try { return JSON.parse($value); } catch { return $value.split(",").map(id => id.trim()).filter(id => id); } })() : ($value ? $value.split(",").map(id => id.trim()).filter(id => id) : []) }}',
			},
		},
	},
];
