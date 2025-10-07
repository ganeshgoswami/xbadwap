import './globals.css';
import { Suspense } from 'react';
import Script from 'next/script';
import AuthAdminProvider from './providers/AdminContext.jsx';
import PublicShell from './PublicShell.jsx';

export const metadata = {
  icons: {
    icon: '/applogo.ico', // ✅ must start with "/"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
        {/* Favicon */}
        {/* <link rel="icon" type="image/x-icon" href="/appicon.ico" sizes="any" /> */}
        {/* Optional: Apple touch icon if provided */}
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
      </head>
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial' }}>
        <Suspense fallback={null}>
          <AuthAdminProvider>
            <PublicShell>
              {children}
            </PublicShell>
          </AuthAdminProvider>
        </Suspense>
        {/* Third-party scripts */}
        <Script
          src="//shortagedissatisfaction.com/e2/98/ce/e298cedaa655a4fbbbe82d05ed96f9ab.js"
          strategy="afterInteractive"
        />
        <Script
          src="//shortagedissatisfaction.com/ad/89/03/ad890351b68e105608c9a8e10134b6ac.js"
          strategy="afterInteractive"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        />
      </body>
    </html>
  );
}
