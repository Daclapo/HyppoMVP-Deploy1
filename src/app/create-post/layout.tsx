import LayoutWithSidebar from '../layout-with-sidebar';

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
