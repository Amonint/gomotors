import { getAllNewsIds } from '@/services/newsService';

export async function generateStaticParams() {
  const news = await getAllNewsIds();
  return news.map((n: { id: string }) => ({ id: n.id }));
}

export default function ReferenteGoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 