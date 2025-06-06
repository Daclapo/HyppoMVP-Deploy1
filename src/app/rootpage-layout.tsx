import LayoutWithSidebar from './layout-with-sidebar';

export default function RootPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
