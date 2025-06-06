import LayoutWithSidebar from '../layout-with-sidebar';

export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
