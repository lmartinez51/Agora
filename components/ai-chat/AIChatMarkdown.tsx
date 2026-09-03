import React from 'react';
import Link from 'next/link';

export interface AIChatMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Safely checks if a URL is valid and safe for navigation.
 * Only relative internal links starting with a single '/' (not '//')
 * and external URLs with 'https:' or 'http:' protocol are considered safe.
 * Dangerous protocols such as 'javascript:', 'data:', 'vbscript:' are strictly blocked.
 */
export function isSafeHref(href: string): boolean {
  if (!href || typeof href !== 'string') return false;
  const trimmed = href.trim();

  // Internal link: must start with single '/' and not '//' or contain '\'
  if (trimmed.startsWith('/')) {
    return !trimmed.startsWith('//') && !trimmed.includes('\\');
  }

  // External link: must strictly be http: or https:
  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Normalizes only escaped markdown syntax delimiters returned by LLMs
 * without corrupting arbitrary text (like Windows paths or intentional backslashes).
 *
 * Examples:
 * \*\*AGORA, ABOGADOS\*\* -> **AGORA, ABOGADOS**
 * \* \*\*Item\*\*        -> * **Item**
 * \1\. Item              -> 1. Item
 * \[Texto\]\(url\)       -> [Texto](url)
 */
export function normalizeEscapedMarkdown(text: string): string {
  if (!text) return '';

  return text
    // Normalize escaped bold formatting: \*\*text\*\* -> **text**
    .replace(/\\\*\\\*(.*?)\\\*\\\*/g, '**$1**')
    // Normalize escaped bullet points at line start: \* or \- followed by whitespace
    .replace(/(^|\n)[ \t]*\\([*-])[ \t]+/g, '$1$2 ')
    // Normalize escaped numbered lists at line start: \1\. -> 1.
    .replace(/(^|\n)[ \t]*\\(\d+)\\\.[ \t]+/g, '$1$2. ')
    // Normalize escaped markdown link brackets: \[text\]\(url\) -> [text](url)
    .replace(/\\\[(.*?)\\\]\\\((.*?)\\\)/g, '[$1]($2)');
}

/**
 * Renders inline text containing bold (**text**), italic (*text*),
 * markdown links [label](url), and parenthesized internal routes like (/agenda).
 */
export function renderInlineContent(text: string): React.ReactNode[] {
  if (!text) return [];

  // Combined regex to tokenize inline elements:
  // 1. Markdown link: [label](url)
  // 2. Parenthesized internal AGORA route: (/agenda...)
  // 3. Bold: **text** or __text__
  // 4. Italic: *text* or _text_
  // 5. Line break: \n
  const tokenRegex =
    /(\[(.+?)\]\((.+?)\))|(\((\/(?:agenda|contacto|conocimiento|practicas|empresas|personas|extranjeros|la-firma|aviso-de-privacidad)(?:\/[a-z0-9-]+)?)\))|(\*\*(.+?)\*\*|__(.+?)__)|(\*([^\*\s][^\*]*?)\*|_([^_\s][^_]*?)_)|(\n)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Append preceding plain text
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    const [
      ,
      isMdLink,
      mdLinkLabel,
      mdLinkUrl,
      isParenRoute,
      parenRouteUrl,
      isBold,
      boldText1,
      boldText2,
      isItalic,
      italicText1,
      italicText2,
      isLineBreak,
    ] = match;

    const key = `inline-${match.index}`;

    if (isMdLink) {
      const label = mdLinkLabel;
      const href = mdLinkUrl.trim();

      if (isSafeHref(href)) {
        if (href.startsWith('/')) {
          elements.push(
            <Link
              key={key}
              href={href}
              className="text-brand-accent underline hover:text-brand-accent-hover transition-colors font-medium"
            >
              {renderInlineContent(label)}
            </Link>
          );
        } else {
          elements.push(
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent underline hover:text-brand-accent-hover transition-colors font-medium"
            >
              {renderInlineContent(label)}
            </a>
          );
        }
      } else {
        // Unsafe link protocol (e.g. javascript:) -> render as safe plain text
        elements.push(
          <span key={key} className="text-brand-primary">
            {label}
          </span>
        );
      }
    } else if (isParenRoute) {
      const route = parenRouteUrl;
      elements.push(
        <span key={key}>
          (
          <Link
            href={route}
            className="text-brand-accent underline hover:text-brand-accent-hover transition-colors font-medium"
          >
            {route}
          </Link>
          )
        </span>
      );
    } else if (isBold) {
      const boldContent = boldText1 || boldText2 || '';
      elements.push(
        <strong key={key} className="font-semibold text-brand-primary">
          {renderInlineContent(boldContent)}
        </strong>
      );
    } else if (isItalic) {
      const italicContent = italicText1 || italicText2 || '';
      elements.push(
        <em key={key} className="italic">
          {renderInlineContent(italicContent)}
        </em>
      );
    } else if (isLineBreak) {
      elements.push(<br key={key} />);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  // Append trailing text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

/**
 * AIChatMarkdown
 *
 * Renders assistant markdown content safely into native React elements:
 * - Normalizes escaped markdown sequences (\*\*text\*\*, \* \*\*item\*\*)
 * - Splits into structural blocks: Paragraphs, Unordered Lists, Ordered Lists
 * - Renders bold, italic, line breaks, internal <Link>s, and safe external <a>s
 * - Zero dangerouslySetInnerHTML usage
 */
export function AIChatMarkdown({ content, className = '' }: AIChatMarkdownProps): React.ReactElement {
  const normalized = normalizeEscapedMarkdown(content);

  // Split content into blocks separated by 2 or more newlines
  const rawBlocks = normalized.split(/\n{2,}/);

  return (
    <div className={`space-y-2 leading-relaxed ${className}`}>
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        const lines = trimmed.split('\n');

        // Check if block is an unordered list (all lines start with * or - )
        const isUnorderedList = lines.every((line) => /^[*-]\s+/.test(line.trim()));
        if (isUnorderedList) {
          return (
            <ul key={`block-${blockIdx}`} className="my-1.5 space-y-1 list-disc list-inside">
              {lines.map((line, lineIdx) => {
                const itemText = line.trim().replace(/^[*-]\s+/, '');
                return <li key={`li-${blockIdx}-${lineIdx}`}>{renderInlineContent(itemText)}</li>;
              })}
            </ul>
          );
        }

        // Check if block is an ordered list (all lines start with 1. 2. etc.)
        const isOrderedList = lines.every((line) => /^\d+\.\s+/.test(line.trim()));
        if (isOrderedList) {
          return (
            <ol key={`block-${blockIdx}`} className="my-1.5 space-y-1 list-decimal list-inside">
              {lines.map((line, lineIdx) => {
                const itemText = line.trim().replace(/^\d+\.\s+/, '');
                return <li key={`oli-${blockIdx}-${lineIdx}`}>{renderInlineContent(itemText)}</li>;
              })}
            </ol>
          );
        }

        // Regular paragraph block
        return (
          <p key={`block-${blockIdx}`} className="my-1">
            {renderInlineContent(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
