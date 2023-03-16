import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const teddy1 = require('@site/static/img/teddy-1.png').default;
const teddy2 = require('@site/static/img/teddy-2.png').default;
const teddy3 = require('@site/static/img/teddy-3.png').default;

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Democratized Ownership',
    image: teddy1,
    description: (
      <>
        Deconstruct the walled gardens of classic financial institutions by becoming an owner of the TeddySwap protocol.
      </>
    ),
  },
  {
    title: 'Efficient Liquidity',
    image: teddy2,
    description: (
      <>
        Level up beyond constant product pools and let your capital work for you by providing liquidity to historically stable and more predictable assets.
      </>
    ),
  },
  {
    title: 'Yield Farming',
    image: teddy3,
    description: (
      <>
        Earn our platform token TEDY by providing liquidity to the available stablecoin pairs on our decentralized exchange.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} alt="" />
      </div>
      <div className="text--center feat-description padding-horiz--md">
        <h3 className="feat-heading">{title}</h3>
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
           {FeatureList.map((props, idx) => <Feature key={idx} {...props} />)}         
        </div>
      </div>
    </section>
  );
}
