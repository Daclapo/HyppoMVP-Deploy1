import LayoutWithSidebar from '../layout-with-sidebar';
import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('create-post');

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
