import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('login');

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
