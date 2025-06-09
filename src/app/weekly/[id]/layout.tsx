import LayoutWithSidebar from '../../layout-with-sidebar';
import WeeklyLayoutAdjuster from './weekly-layout-adjuster';

export default function WeeklyPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWithSidebar>
      {/* Este componente ajusta el layout específico para esta ruta */}
      <WeeklyLayoutAdjuster />
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </LayoutWithSidebar>
  );
}
