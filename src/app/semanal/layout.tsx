import LayoutWithSidebar from '../layout-with-sidebar';
import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('semanal');

export default function SemanalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
