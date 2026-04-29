import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { ClientProviders } from '@/components/ClientProviders'
import { LOCALE_STORAGE_KEY } from '@/lib/i18n'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SQL Trainer',
  description: 'Practice SQL with hands-on exercises — SELECT, JOINs, aggregations, DDL and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var locale = localStorage.getItem('${LOCALE_STORAGE_KEY}');
                if (locale === 'de' || locale === 'en') {
                  document.documentElement.lang = locale;
                }
              } catch(e) {}
              try {
                var t = localStorage.getItem('sqlTrainerTheme');
                if (t === 'light' || t === 'dark') {
                  document.documentElement.setAttribute('data-theme', t);
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
