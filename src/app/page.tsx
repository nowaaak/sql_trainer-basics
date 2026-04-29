'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useLocale } from '@/hooks/useLocale'
import { exercises } from '@/data/exercises'
import styles from './page.module.css'

const ddlCount = exercises.filter(e => e.category === 'ddl').length
const dmlCount = exercises.filter(e => e.category === 'dml').length
const dqlCount = exercises.filter(e => e.category === 'dql').length
const joinCount = exercises.filter(e => e.category === 'joins').length

export default function LandingPage() {
  const { locale, t } = useLocale()
  const codeSample = locale === 'de'
    ? `SELECT
  k.Vorname,
  k.Nachname,
  COUNT(b.BestellID) AS Bestellungen
FROM Kunden k
LEFT JOIN Bestellungen b
  ON k.KundenID = b.KundenID
GROUP BY k.KundenID
ORDER BY Bestellungen DESC;`
    : `SELECT
  c.first_name,
  c.last_name,
  COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC;`

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
              <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
            </svg>
            <span>SQL Trainer</span>
          </div>
          <div className={styles.headerActions}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>{t.landing.badge}</div>
            <h1 className={styles.headline}>
              {t.landing.headline}<br />
              <span className={styles.headlineAccent}>{t.landing.headlineAccent}</span>
            </h1>
            <p className={styles.subtitle}>{t.landing.subtitle}</p>
            <div className={styles.actions}>
              <Link href="/trainer" className={styles.ctaPrimary}>
                {t.landing.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden>
            <div className={styles.codeCard}>
              <div className={styles.codeCardDots}>
                <span /><span /><span />
              </div>
              <pre className={styles.code}><code>{codeSample}</code></pre>
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statsInner}>
            <StatBlock value={ddlCount} label="DDL" desc={t.landing.stats.ddlDesc} />
            <StatBlock value={dmlCount} label="DML" desc={t.landing.stats.dmlDesc} />
            <StatBlock value={dqlCount} label="DQL" desc={t.landing.stats.dqlDesc} />
            <StatBlock value={joinCount} label="JOINs" desc={t.landing.stats.joinsDesc} />
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featuresInner}>
            <Feature
              icon={<SchemaIcon />}
              title={t.landing.features.schema.title}
              desc={t.landing.features.schema.desc}
            />
            <Feature
              icon={<HintIcon />}
              title={t.landing.features.hints.title}
              desc={t.landing.features.hints.desc}
            />
            <Feature
              icon={<ProgressIcon />}
              title={t.landing.features.progress.title}
              desc={t.landing.features.progress.desc}
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerMeta}>
          <p>SQL Trainer</p>
          <a
            href={`https://${t.footer.domain}`}
            target="_blank"
            rel="noreferrer"
            className={styles.footerBrand}
          >
            {t.footer.builtBy} {t.footer.domain}
          </a>
        </div>
        <Link href="/trainer" className={styles.footerLink}>{t.landing.footerCta}</Link>
      </footer>
    </div>
  )
}

function StatBlock({ value, label, desc }: { value: number; label: string; desc: string }) {
  return (
    <div className={styles.statBlock}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statDesc}>{desc}</span>
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </div>
  )
}

function SchemaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="8" height="5" rx="1" />
      <rect x="14" y="3" width="8" height="5" rx="1" />
      <rect x="2" y="16" width="8" height="5" rx="1" />
      <path d="M6 8v3M18 8v5M6 11h12M6 13v3" />
    </svg>
  )
}

function HintIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  )
}

function ProgressIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}
