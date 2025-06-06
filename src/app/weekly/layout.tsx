import LayoutWithSidebar from '../layout-with-sidebar';

export default function WeeklyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
