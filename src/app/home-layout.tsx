import LayoutWithSidebar from './layout-with-sidebar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
