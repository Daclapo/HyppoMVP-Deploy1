import LayoutWithSidebar from '../layout-with-sidebar';

export default function AllPostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
