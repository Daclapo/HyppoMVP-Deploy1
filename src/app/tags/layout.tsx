import LayoutWithSidebar from '../layout-with-sidebar';
import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('tags');

export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
