import { FC, useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoadingScreen } from '../components/common/LoadingScreen';

const markdownPath = require('../assets/markdown/faq.md').default;

const FAQ: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(markdownPath)
      .then((response) => response.text())
      .then(setMarkdown)
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Markdown children={markdown} remarkPlugins={[remarkGfm]} />
  );
};

export default FAQ;
