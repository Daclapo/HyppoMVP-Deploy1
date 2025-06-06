import LayoutWithSidebar from '../../layout-with-sidebar';

export default function WeeklyPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
