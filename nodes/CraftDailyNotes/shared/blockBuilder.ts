/**
 * SMART BLOCK BUILDER
 * Converts markdown content into Craft API block structure
 * FAIL-SAFE: If any processing fails, sends as plain text (API handles it)
 */

export interface TextBlockStructure {
	type: 'text';
	markdown: string;
	// Valid textStyle values per API: card, page, h1, h2, h3, h4, caption, body
	textStyle: 'body' | 'card' | 'page' | 'h1' | 'h2' | 'h3' | 'h4' | 'caption';
	listStyle?: 'none' | 'bullet' | 'numbered' | 'todo' | 'toggle';
}

export interface CodeBlockStructure {
	type: 'code';
	rawCode: string;
	language?: string;
}

export type BlockStructure = TextBlockStructure | CodeBlockStructure;

export interface BlockBuilderOptions {
	preserveHeaders: boolean;
	splitOnParagraphs: boolean;
}

const DEFAULT_OPTIONS: BlockBuilderOptions = {
	preserveHeaders: true,
	splitOnParagraphs: true,
};

/**
 * Create a text block with explicit 'body' textStyle
 * API REQUIRES textStyle - cannot be omitted!
 */
function createBodyTextBlock(markdown: string): TextBlockStructure {
	return { type: 'text', markdown: markdown.trim(), textStyle: 'body' };
}

/**
 * Create a code block with rawCode property
 * Extracts language hint from opening ``` if present
 * DEFENSIVE: Always ensures rawCode is a non-empty string
 */
function createCodeBlock(codeContent: string): CodeBlockStructure {
	// Normalize line endings and trim
	const normalized = (codeContent || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
	
	// If empty or just backticks, return empty code block
	if (!normalized || normalized === '``````' || normalized === '```\n```') {
		return { type: 'code', rawCode: '' };
	}
	
	// Try regex extraction first (handles language hints)
	// Match: ```[language]\n[content]\n```
	const match = normalized.match(/^```(\w*)\n?([\s\S]*?)\n?```$/);
	if (match && match[2] !== undefined) {
		const rawCode = match[2].trim();
		const language = match[1] || undefined;
		return {
			type: 'code',
			rawCode: rawCode,
			...(language ? { language } : {}),
		};
	}
	
	// Fallback: aggressively remove ``` markers
	let cleaned = normalized;
	
	// Remove opening ``` with optional language
	cleaned = cleaned.replace(/^```\w*[\r\n]*/, '');
	// Remove closing ```
	cleaned = cleaned.replace(/[\r\n]*```$/, '');
	// Remove any remaining ``` at start/end
	cleaned = cleaned.replace(/^`+/, '').replace(/`+$/, '');
	
	// Final safety: ensure rawCode is never undefined
	const rawCode = cleaned.trim() || '';
	
	return { type: 'code', rawCode };
}

/**
 * Detect text style from markdown content (only for headers)
 */
function detectTextStyle(line: string): TextBlockStructure['textStyle'] | undefined {
	if (line.startsWith('# ')) return 'h1';
	if (line.startsWith('## ')) return 'h2';
	if (line.startsWith('### ')) return 'h3';
	if (line.startsWith('#### ') || line.startsWith('##### ') || line.startsWith('###### ')) return 'h4';
	// Return undefined for non-headers - let API decide
	return undefined;
}

/**
 * Check if a line is a header
 */
function isHeader(line: string): boolean {
	return /^#{1,6}\s+/.test(line);
}

/**
 * Extract code blocks from markdown BEFORE paragraph splitting
 * FAIL-SAFE: If regex fails, returns whole content as text
 */
function extractCodeBlocks(markdown: string): Array<{ type: 'code' | 'text'; content: string }> {
	try {
		const result: Array<{ type: 'code' | 'text'; content: string }> = [];
		
		// Match code blocks: ```...``` (including internal newlines)
		const codeBlockRegex = /```[\s\S]*?```/g;
		
		let lastIndex = 0;
		let match;
		
		while ((match = codeBlockRegex.exec(markdown)) !== null) {
			if (match.index > lastIndex) {
				const textBefore = markdown.slice(lastIndex, match.index);
				if (textBefore.trim()) {
					result.push({ type: 'text', content: textBefore });
				}
			}
			result.push({ type: 'code', content: match[0] });
			lastIndex = match.index + match[0].length;
		}
		
		if (lastIndex < markdown.length) {
			const remaining = markdown.slice(lastIndex);
			if (remaining.trim()) {
				result.push({ type: 'text', content: remaining });
			}
		}
		
		// If no segments found, return whole thing as text
		if (result.length === 0) {
			return [{ type: 'text', content: markdown }];
		}
		
		return result;
	} catch {
		// FAIL-SAFE: Return whole content as single text segment
		return [{ type: 'text', content: markdown }];
	}
}

/**
 * Split text by paragraphs (double newlines)
 * FAIL-SAFE: If split fails, returns whole text
 */
function splitByParagraphs(text: string): string[] {
	try {
		const parts = text.split(/\n\n+/).filter((p) => p.trim());
		return parts.length > 0 ? parts : [text];
	} catch {
		return [text];
	}
}

/**
 * Build blocks from markdown content
 * FAIL-SAFE: Any error = send whole content as plain text
 */
export function buildBlocksFromMarkdown(
	markdown: string,
	options: Partial<BlockBuilderOptions> = {},
): BlockStructure[] {
	// Handle empty input
	if (!markdown || !markdown.trim()) {
		return [];
	}

	try {
		const opts = { ...DEFAULT_OPTIONS, ...options };
		const blocks: BlockStructure[] = [];

		// STEP 1: Extract code blocks first (preserved as single units)
		const segments = extractCodeBlocks(markdown);

		for (const segment of segments) {
			try {
				// Code blocks: send as type: 'code' with rawCode property
				if (segment.type === 'code') {
					blocks.push(createCodeBlock(segment.content));
					continue;
				}

				// STEP 2: Split text by paragraphs
				const paragraphs = opts.splitOnParagraphs 
					? splitByParagraphs(segment.content) 
					: [segment.content];

				for (const paragraph of paragraphs) {
					const trimmed = paragraph.trim();
					if (!trimmed) continue;

					// Headers get textStyle, everything else is plain
					if (opts.preserveHeaders && isHeader(trimmed)) {
						const lines = trimmed.split('\n');
						for (const line of lines) {
							const lineTrimmed = line.trim();
							if (!lineTrimmed) continue;
							
							const style = detectTextStyle(lineTrimmed);
							if (style) {
								blocks.push({ type: 'text', markdown: lineTrimmed, textStyle: style });
							} else {
								blocks.push(createBodyTextBlock(lineTrimmed));
							}
						}
					} else {
						// Plain text with textStyle: 'body'
						blocks.push(createBodyTextBlock(trimmed));
					}
				}
			} catch {
				// FAIL-SAFE: If segment processing fails, add as plain text
				blocks.push(createBodyTextBlock(segment.content));
			}
		}

		// STEP 3: Validate and sanitize all blocks before returning
		const validBlocks = blocks
			.map((block) => sanitizeBlock(block))
			.filter((block): block is BlockStructure => block !== null);

		// If we got valid blocks, return them
		if (validBlocks.length > 0) {
			return validBlocks;
		}

		// FAIL-SAFE: No blocks created? Send whole thing as one block
		return [createBodyTextBlock(markdown)];

	} catch {
		// ULTIMATE FAIL-SAFE: Any error = send whole markdown as single plain text block
		return [createBodyTextBlock(markdown)];
	}
}

/**
 * Sanitize a block to ensure it meets API requirements
 * Returns null if block is invalid and should be filtered out
 */
function sanitizeBlock(block: BlockStructure): BlockStructure | null {
	if (!block || typeof block !== 'object') {
		return null;
	}

	// Handle code blocks
	if (block.type === 'code') {
		// Ensure rawCode exists and is a string
		if (typeof block.rawCode !== 'string') {
			return null; // Invalid code block - filter out
		}
		return {
			type: 'code',
			rawCode: block.rawCode,
			...(block.language ? { language: block.language } : {}),
		};
	}

	// Handle text blocks
	if (block.type === 'text') {
		// Ensure markdown exists and is a string
		if (typeof block.markdown !== 'string') {
			return null; // Invalid text block - filter out
		}
		// Ensure textStyle is valid
		const validStyles = ['body', 'card', 'page', 'h1', 'h2', 'h3', 'h4', 'caption'];
		const textStyle = validStyles.includes(block.textStyle) ? block.textStyle : 'body';
		return {
			type: 'text',
			markdown: block.markdown,
			textStyle,
		};
	}

	// Unknown block type - filter out
	return null;
}

/**
 * Parse JSON block array from user input
 * Validates and normalizes the structure
 */
export function parseBlockArray(jsonString: string): BlockStructure[] {
	try {
		const parsed = JSON.parse(jsonString);
		
		// Handle both array and single object
		const blocks = Array.isArray(parsed) ? parsed : [parsed];
		
		// Validate and normalize each block
		return blocks.map((block) => {
			if (!block.type) {
				block.type = 'text';
			}
			if (!block.markdown && block.content) {
				block.markdown = block.content;
			}
			return block as BlockStructure;
		});
	} catch {
		throw new Error('Invalid JSON block array. Expected format: [{"type":"text","markdown":"Content"}]');
	}
}
