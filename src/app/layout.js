import './globals.css';
import { Manrope } from 'next/font/google'

const font = Manrope({ subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
