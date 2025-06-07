import LayoutWithSidebar from '../layout-with-sidebar';
import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('debates');

export default function DebatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
