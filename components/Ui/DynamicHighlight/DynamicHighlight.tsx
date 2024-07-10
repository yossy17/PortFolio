// @/components/Ui/DynamicHighlight/DynamicHighlight.tsx
'use client';

import { useMemo } from 'react';
import { consola } from '@/components/Ui/Fonts/Fonts';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import Loading from '@/app/loading';

interface DynamicHighlightProps {
  content: string;
}

export default function DynamicHighlight({ content }: DynamicHighlightProps) {
  const highlightedContent = useMemo(() => {
    const $ = cheerio.load(content);
    $('div[data-filename]').each((_, element) => {
      const filename = $(element).attr('data-filename') ?? 'Unknown file';
      $(element).prepend(`<p>${filename}</p>`);
      $(element).addClass('code-block');
      $(element).addClass(consola.className);
    });
    $('pre code').each((_, element) => {
      const code = $(element).text();
      const languageClass = $(element).attr('class') ?? '';
      const language = languageClass.replace('language-', '');
      try {
        const highlightedCode = hljs.getLanguage(language)
          ? hljs.highlight(code, { language }).value
          : hljs.highlightAuto(code).value;
        $(element).html(highlightedCode);
        $(element).addClass('hljs');
        $(element).addClass(consola.className);
      } catch (error) {
        console.error('Error highlighting code:', error);
        // エラーが発生した場合、元のコードをそのまま使用
        $(element).html(code);
      }
    });

    return $.html();
  }, [content]);

  if (!highlightedContent) {
    return <Loading />;
  }

  return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
}
