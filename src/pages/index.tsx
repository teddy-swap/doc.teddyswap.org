import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Official Documentation`}
      description="Description will go into a meta tag in <head />">
      <Head>
        <meta property="og:title" content="Official Documentation | TeddySwap" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs-teddyswap-org.pages.dev/docs/" />
        <meta property="og:image" content="/img/TeddySwap-Card.webp" />
        <meta property="og:image:alt" content="TeddySwap logo surrounded by teddy bears" />
        <meta property="og:description" content="Coziest Stablecoin DEX on Cardano" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://docs-teddyswap-org.pages.dev/docs/" />
        <meta name="twitter:title" content="Official Documentation | TeddySwap" />
        <meta name="twitter:image" content="/img/TeddySwap-Card.webp" />
        <meta name="twitter:image:alt" content="TeddySwap logo surrounded by teddy bears" />
        <meta name="twitter:description" content="Coziest Stablecoin DEX on Cardano" />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
