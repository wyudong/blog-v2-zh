import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google';
import '../styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.wyudong.com'),
  title: {
    default: 'wyudong',
    template: '%s | wyudong'
  },
  description: 'my portfolio',
  openGraph: {
    title: 'wyudong',
    description: 'my portfolio',
    url: absoluteUrl('/'),
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon/favicon.ico' }]
  }
}

const notoSansSC = Noto_Sans_SC({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${notoSansSC.className} bg-neutral-50`}>{children}</body>
    </html>
  )
}
