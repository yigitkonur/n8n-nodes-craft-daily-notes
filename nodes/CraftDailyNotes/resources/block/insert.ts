/**
 * BLOCK INSERT OPERATION
 * POST /blocks - Insert content into a daily note
 * 
 * SIMPLE APPROACH: Send markdown as single text block, Craft API parses it automatically!
 * The API splits markdown into proper blocks (headers, code, paragraphs) server-side.
 */
import type {
	INodeProperties,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';

const showOnlyForBlockInsert = { operation: ['insert'], resource: ['block'] };

/**
 * Build position object from node parameters
 */
function buildPositionObject(context: IExecuteSingleFunctions): IDataObject {
	const positionType = (context.getNodeParameter('positionType', 'end') as string) || 'end';
	const targetDate = (context.getNodeParameter('targetDate', 'today') as string) || 'today';
	const referenceBlockId = (context.getNodeParameter('referenceBlockId', '') as string) || '';

	const position: IDataObject = {
		position: positionType,
		date: targetDate,
	};

	// Add siblingId only for before/after positioning (API uses siblingId, not referenceBlockId)
	if (['before', 'after'].includes(positionType) && referenceBlockId) {
		position.siblingId = referenceBlockId;
	}

	return position;
}

/**
 * PreSend hook for block insert operation
 *
 * Builds the request body for inserting markdown content.
 * Craft API parses markdown into proper blocks server-side.
 */
export async function blockInsertPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const position = buildPositionObject(this);

	// Get markdown content with proper type coercion
	const rawValue = this.getNodeParameter('markdownContent', '') as string | unknown;
	const markdownContent = typeof rawValue === 'string' ? rawValue : String(rawValue ?? '');

	// Build request body - n8n handles JSON serialization automatically
	const requestBody: IDataObject = {
		blocks: [
			{
				type: 'text',
				markdown: markdownContent,
			},
		],
		position: {
			position: String(position.position || 'end'),
			date: String(position.date || 'today'),
		},
	};

	// Add siblingId only for before/after positioning
	if (position.siblingId) {
		(requestBody.position as IDataObject).siblingId = String(position.siblingId);
	}

	requestOptions.body = requestBody;
	return requestOptions;
}

export const blockInsertDescription: INodeProperties[] = [
	// Markdown Content - main input field
	{
		displayName: 'Markdown Content',
		name: 'markdownContent',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		default: '',
		required: true,
		placeholder: '# Meeting Notes\n\n- Discussed timeline\n- Assigned tasks\n\n```javascript\nconsole.log("code blocks work too!");\n```\n\nNext steps...',
		description: 'Paste markdown content. Craft API automatically parses it into proper blocks (headers, code, lists, etc.).',
		displayOptions: { show: showOnlyForBlockInsert },
	},

	// Target Date
	{
		displayName: 'Target Date',
		name: 'targetDate',
		type: 'string',
		default: 'today',
		placeholder: 'today, tomorrow, yesterday, or YYYY-MM-DD',
		description: 'Which daily note to insert into',
		displayOptions: { show: showOnlyForBlockInsert },
	},

	// Position Type
	{
		displayName: 'Insert Position',
		name: 'positionType',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'End of Document', value: 'end' },
			{ name: 'Start of Document', value: 'start' },
			{ name: 'Before Block', value: 'before' },
			{ name: 'After Block', value: 'after' },
		],
		default: 'end',
		description: 'Where to insert the content in the daily note',
		displayOptions: { show: showOnlyForBlockInsert },
	},

	// Reference Block ID (only for before/after)
	{
		displayName: 'Reference Block ID',
		name: 'referenceBlockId',
		type: 'string',
		default: '',
		placeholder: 'Block UUID',
		description: 'The block ID to position relative to (required for before/after)',
		displayOptions: {
			show: {
				...showOnlyForBlockInsert,
				positionType: ['before', 'after'],
			},
		},
	},
];
