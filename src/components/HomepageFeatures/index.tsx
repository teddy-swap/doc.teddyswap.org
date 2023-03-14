import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Democratized Ownership',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Deconstruct the walled gardens of classic financial institutions by becoming an owner of the TeddySwap protocol.
      </>
    ),
  },
  {
    title: 'Efficient Liquidity',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       Level up beyond constant product pools and let your capital work for you by providing liquidity to historically stable and more predictable assets.
      </>
    ),
  },
  {
    title: 'Yield Farming',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Earn our platform token TEDY by providing liquidity to the available stablecoin pairs on our decentralized exchange.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
