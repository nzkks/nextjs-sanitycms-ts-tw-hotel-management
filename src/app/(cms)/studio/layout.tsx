export const metadata = {
  title: 'CMS for Hotel Management System',
  description: 'CMS for Hotel Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
