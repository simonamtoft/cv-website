import { useParams } from 'react-router';
import ArticlePresentationView from '../components/articles/ArticlePresentationView';
import { getArticleBySlug } from '../data/articles';
import { buildMeta } from '../utils/meta';

export function meta({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return buildMeta({ title: 'Writing | Simon Amtoft Pedersen', path: '/writing' });
  }
  const { title, dek, slug } = article.frontmatter;
  return buildMeta({
    title: `${title} (Slides) | Simon Amtoft Pedersen`,
    description: dek,
    path: `/writing/${slug}/present`,
    type: 'article',
  });
}

export default function PresentRoute() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="main-content page-content" id="main-content">
        <p className="article-not-found">Article not found.</p>
      </main>
    );
  }

  return <ArticlePresentationView article={article} />;
}
