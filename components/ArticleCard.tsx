import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isMain?: boolean;
  baseId: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isMain = false, baseId }) => {
  if (isMain) {
    return (
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="w-full">
            <img src={article.imageUrl} alt={article.headline} className="w-full h-auto object-cover shadow-lg" />
        </div>
        <div className="flex flex-col">
            <span 
              id={`${baseId}-category`}
              tabIndex={-1}
              className="font-bold text-accent uppercase tracking-wider mb-2 category-text readable-content"
            >
              {article.category}
            </span>
            <h2 
              id={`${baseId}-headline`}
              tabIndex={-1}
              className="font-serif font-bold text-ink mb-3 leading-tight headline-main readable-content"
            >
              {article.headline}
            </h2>
            <p 
              id={`${baseId}-summary`}
              tabIndex={-1}
              className="text-gray-700 mb-4 article-summary-main readable-content"
            >
              {article.summary}
            </p>
            <p 
              id={`${baseId}-body`}
              tabIndex={-1}
              className="text-ink whitespace-pre-line text-justify readable-content"
            >
              {article.body}
            </p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col group">
      <div className="overflow-hidden mb-4">
        <img src={article.imageUrl} alt={article.headline} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" />
      </div>
      <span 
        id={`${baseId}-category`}
        tabIndex={-1}
        className="font-bold text-accent uppercase tracking-wider mb-1 category-text readable-content"
      >
        {article.category}
      </span>
      <h3 
        id={`${baseId}-headline`}
        tabIndex={-1}
        className="font-serif font-bold text-ink mb-2 leading-snug headline-secondary readable-content"
      >
        {article.headline}
      </h3>
      <p 
        id={`${baseId}-summary`}
        tabIndex={-1}
        className="text-gray-600 flex-grow article-summary-secondary readable-content"
      >
        {article.summary}
      </p>
    </article>
  );
};

export default ArticleCard;