/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  defaultSidebar:
 [
    {
      type: 'category',
      label: 'Overview',
      items: ['introduction',
              'disclaimer',
              'objectives',
              'Advantages',
              {
                type: 'category',
                label: 'Product Summary',
                id: 'Product Summary/Product Summary'',
                items: [
                       'Product Summary/Invariant Calculation',
                       ],
              },
              'Yield Opportunities',
              'Roadmap',
              'Security',
              {
                type: 'category',
                label: 'Tokenomics',
                id: 'Tokenomics/Tokenomics',
                items: [
                       'Tokenomics/Chart',
                       'Tokenomics/Yield Emissions',
                       'Tokenomics/Staking Rewards',
                       'Tokenomics/Utility' 
                       ],
              },
              'Governance',
              'Team',
              ],
      collapsible: false
    },
    {
      type: 'category',
      label: 'Testnet Guide',
      items: ['Getting Started',
              'Nami Setup',
              'Swap',
              'Liquidity',
              'Redeem',
              'Orders'
             ],
      collapsible: false
   },
  ],
};
module.exports = sidebars;
