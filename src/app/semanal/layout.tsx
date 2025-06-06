import LayoutWithSidebar from '../layout-with-sidebar';

export default function SemanalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
