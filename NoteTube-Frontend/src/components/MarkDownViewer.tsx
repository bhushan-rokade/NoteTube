import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import '../App.css';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  return (
    <div
      className='markdown-body'
      style={{ width: '90%', padding: '5%', paddingBlock: '2rem' }}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </div>
  );
};

export default MarkdownViewer;
