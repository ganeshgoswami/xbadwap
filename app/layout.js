import './globals.css';
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
        <AuthAdminProvider>
          <PublicShell>
            {children}
          </PublicShell>
        </AuthAdminProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          defer
        />
      </body>
    </html>
  );
}
