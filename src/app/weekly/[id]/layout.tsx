import LayoutWithSidebar from '../../layout-with-sidebar';

export default function WeeklyPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWithSidebar>
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </LayoutWithSidebar>
  );
}
