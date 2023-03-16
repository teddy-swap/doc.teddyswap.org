// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TeddySwap',
  tagline: 'The Coziest Stablecoin DEX on Cardano 🧸',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://docs-teddyswap-org.pages.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'teddy-swap', // Usually your GitHub org/user name.
  projectName: 'docs.teddyswap.org', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.  
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/TeddySwap-Card.jpg',
      navbar: {
        title: 'TeddySwap',
        logo: {
          alt: 'Logo',
          src: 'img/favicon.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Get Started',
          },
          {
            href: 'https://blog.teddyswap.org',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://teddyswap.org',
            label: 'Website',
            position: 'left',
          },
          {
            label: 'Testnet',
            href: 'https://preview.app.teddyswap.org',
            position: 'left',
          },
          {
            href: 'https://github.com/teddy-swap',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/introduction',
              },
              {
                label: 'Testnet Guide',
                to: '/docs/Getting Started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/TeddySwap',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/GRvcAnqtZG',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/teddyswap',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.teddyswap.org',
              },
              {
                label: 'Website',
                href: 'https://teddyswap.org',
              },
              {
                label: 'Testnet',
                href: 'https://preview.app.teddyswap.org',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/teddy-swap',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TeddySwap. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'MFVD14WG33',

        // Public API key: it is safe to commit it
        apiKey: 'e8f42d81fbcf622eefe3d86c5d698fd8',

        indexName: 'DOCS',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

      },
    }),
  plugins: [],
};

module.exports = config;
