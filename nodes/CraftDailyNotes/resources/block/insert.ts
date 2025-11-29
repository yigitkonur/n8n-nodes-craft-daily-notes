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
 * Build position object from simple node parameters
 */
function buildPositionObject(context: IExecuteSingleFunctions): IDataObject {
	let positionType = 'end';
	let targetDate = 'today';
	let referenceBlockId = '';

	try {
		positionType = context.getNodeParameter('positionType', 'end') as string;
		targetDate = context.getNodeParameter('targetDate', 'today') as string;
		referenceBlockId = context.getNodeParameter('referenceBlockId', '') as string;
	} catch {
		// Use defaults if parameters can't be read
	}

	const position: IDataObject = {
		position: positionType || 'end',
		date: targetDate || 'today',
	};

	// Add referenceBlockId if using before/after
	if (['before', 'after'].includes(positionType) && referenceBlockId) {
		position.referenceBlockId = referenceBlockId;
	}

	return position;
}

/**
 * PreSend hook for block insert operation
 * 
 * DEBUG MODE: Set debugMode = true to see exactly what's being sent
 */
export async function blockInsertPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	// === DEBUG MODE - SET TO true TO SEE WHAT'S BEING SENT ===
	const DEBUG_MODE = true;
	
	const debugInfo: string[] = [];
	debugInfo.push('=== CRAFT INSERT v1.0.20 DEBUG ===');
	debugInfo.push(`requestOptions.body BEFORE: ${JSON.stringify(requestOptions.body)}`);
	debugInfo.push(`requestOptions.method: ${requestOptions.method}`);
	debugInfo.push(`requestOptions.url: ${requestOptions.url}`);
	
	// Build position object
	const position = buildPositionObject(this);
	debugInfo.push(`Position: ${JSON.stringify(position)}`);

	// Get markdown content
	let markdownContent = '';
	let rawValueType = 'unknown';
	try {
		const rawValue = this.getNodeParameter('markdownContent', '');
		rawValueType = typeof rawValue;
		debugInfo.push(`markdownContent type: ${rawValueType}`);
		debugInfo.push(`markdownContent isArray: ${Array.isArray(rawValue)}`);
		
		if (rawValue === null || rawValue === undefined) {
			markdownContent = '';
			debugInfo.push('markdownContent: NULL/UNDEFINED');
		} else if (typeof rawValue === 'string') {
			markdownContent = rawValue;
			debugInfo.push(`markdownContent length: ${rawValue.length}`);
			debugInfo.push(`markdownContent first 300 chars: ${rawValue.substring(0, 300)}`);
		} else if (Array.isArray(rawValue)) {
			debugInfo.push(`WARNING: ARRAY with ${rawValue.length} items`);
			debugInfo.push(`Array contents: ${JSON.stringify(rawValue).substring(0, 500)}`);
			markdownContent = rawValue.join('\n');
		} else if (typeof rawValue === 'object') {
			debugInfo.push(`WARNING: OBJECT`);
			debugInfo.push(`Object contents: ${JSON.stringify(rawValue).substring(0, 500)}`);
			markdownContent = JSON.stringify(rawValue);
		} else {
			markdownContent = String(rawValue);
		}
	} catch (error) {
		debugInfo.push(`ERROR: ${error}`);
		markdownContent = '';
	}

	debugInfo.push(`Has triple backticks: ${markdownContent.includes('```')}`);
	debugInfo.push(`Final content length: ${markdownContent.length}`);

	// Create the body
	const bodyObject = {
		blocks: [
			{
				type: 'text',
				markdown: markdownContent,
			},
		],
		position: {
			position: String(position.position || 'end'),
			date: String(position.date || 'today'),
			...(position.referenceBlockId ? { referenceBlockId: String(position.referenceBlockId) } : {}),
		},
	};

	const jsonBody = JSON.stringify(bodyObject);
	debugInfo.push(`JSON body blocks count: ${bodyObject.blocks.length}`);
	debugInfo.push(`JSON body length: ${jsonBody.length}`);
	debugInfo.push(`JSON body first 800 chars: ${jsonBody.substring(0, 800)}`);
	
	// If DEBUG_MODE, throw error with all debug info so user can see it in UI
	if (DEBUG_MODE) {
		throw new Error('DEBUG INFO (this is intentional):\n\n' + debugInfo.join('\n'));
	}
	
	requestOptions.body = jsonBody;
	requestOptions.headers = {
		...requestOptions.headers,
		'Content-Type': 'application/json',
	};

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
