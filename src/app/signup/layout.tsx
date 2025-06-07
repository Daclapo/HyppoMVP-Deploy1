import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata('signup');

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
