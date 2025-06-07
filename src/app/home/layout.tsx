import LayoutWithSidebar from '../layout-with-sidebar';
import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('home');

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
