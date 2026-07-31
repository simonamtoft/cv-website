import { useLocation, useParams } from 'react-router';
import PageTransition from '../components/PageTransition';
import ArticleReadingView from '../components/articles/ArticleReadingView';
import { getArticleBySlug } from '../data/articles';
import { buildMeta } from '../utils/meta';

export function meta({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return buildMeta({ title: 'Writing | Simon Amtoft Pedersen', path: '/writing' });
  }
  const { title, dek, slug } = article.frontmatter;
  return buildMeta({
    title: `${title} | Simon Amtoft Pedersen`,
    description: dek,
    path: `/writing/${slug}`,
    type: 'article',
  });
}

export default function ArticleRoute() {
  const location = useLocation();
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  return (
    <PageTransition key={location.key}>
      <main className="main-content page-content" id="main-content">
        {article ? (
          <ArticleReadingView article={article} />
        ) : (
          <p className="article-not-found">Article not found.</p>
        )}
      </main>
    </PageTransition>
  );
}
