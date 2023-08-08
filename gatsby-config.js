const dotenv = require(`dotenv`);
const path = require('path');

const config = require(`./config/website`);
const styleVariables = require(`./src/styles/variables.js`);
const tailwindConfig = require(`./tailwind.config.js`);

const pathPrefix = config.pathPrefix === `/` ? `` : config.pathPrefix;

if (process.env.ENVIRONMENT !== 'production') dotenv.config();

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const isProduction = process.env.NODE_ENV === 'production';

const githubToken = process.env.GITHUB_TOKEN;

module.exports = {
  /* General Information */
  siteMetadata: {
    title: `Darshan Chobarkar`,
    description: `Welcome to Darshan Web Dev, a freelance web developer specializing in frontend and backend solutions. With expertise in Gatsby and NestJs frameworks, I create captivating websites with user-friendly interfaces and impressive Prismic CMS integrations. Explore my portfolio for striking designs and robust backend functionality. Let's collaborate and bring your web visions to life!`,
    siteUrl: `https://darshanwebdev.com`,
    author: `Darshan Chobarkar`,
    keywords: [
      `Darshan Chobarkar`,
      `Darshan`,
      `Gatsby`,
      `fullstack`,
      `software`,
      `engineer`,
      `developer`,
      `design`,
      `portfolio`,
      `react`,
      `javascript`,
      `website optimization`,
    ],
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
        external: false,
      },
      {
        name: `Project`,
        link: `/project/`,
        external: false,
      },
      {
        name: `Blog`,
        link: `/blog/`,
        external: false,
      },
      {
        name: `Contact`,
        link: `/contact/`,
        external: false,
      },
    ],
  },
  /* Flags */
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PARALLEL_SOURCING: true,
    FAST_DEV: true,
    DEV_SSR: true,
  },
  /* Plugins */
  plugins: [
    { resolve: `gatsby-plugin-netlify` },
    { resolve: `gatsby-plugin-react-helmet` },
    { resolve: `gatsby-plugin-sitemap` },
    { resolve: `gatsby-plugin-styled-components` },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        devMode: false,
        disable: isProduction,
      },
    },
    {
      resolve: `gatsby-plugin-image`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          backgroundColor: `transparent`,
          placeholder: `blurred`,
        },
      },
    },
    { resolve: `gatsby-plugin-sharp` },
    { resolve: `gatsby-transformer-sharp` },
    { resolve: `gatsby-plugin-optimize-svgs` },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `tterb-gatsby`,
      },
    },
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [
          `cloning`,
          `flattening`,
          `metadata`,
          `placeholders`,
          `shorthands`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        src: path.join(__dirname, `src`),
        pages: path.join(__dirname, `src/pages`),
        components: path.join(__dirname, `src/components`),
        config: path.join(__dirname, `config`),
        content: path.join(__dirname, `src/content`),
        elements: path.join(__dirname, `src/elements`),
        hooks: path.join(__dirname, `src/hooks`),
        styles: path.join(__dirname, `src/styles`),
        views: path.join(__dirname, `src/views`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-smartypants`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 820,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `nofollow noopener noreferrer`,
            },
          },
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              class: `emoji`,
              size: 32,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: `async`,
        /* Enable font loading listener to handle FOUT */
        enableListener: true,
        custom: [
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: [`TTNorms2`],
            /* Path to the font CSS file inside the "static" folder with @font-face definition */
            file: `/fonts/fonts.css`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`, // Implements PostCSS
      options: {
        postCssPlugins: [
          require(`autoprefixer`),
          require(`postcss-import`), // Add support for sass-like `@import`
          require(`postcss-mixins`), // Adds support for mixins
          require(`postcss-nested`), // Add support for sass-like nesting of rules
          require(`postcss-simple-vars`)({ variables: styleVariables }),
          require(`postcss-calc`),
          require(`postcss-discard-comments`),
          require(`cssnano`), // Minify CSS
          require(`postcss-preset-env`)({
            stage: 3, // More info about stages: https://cssdb.org/#staging-process
          }),
          require(`tailwindcss`)(tailwindConfig),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
        ignore: [`**/*_.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts/`,
        ignore: [`drafts/*.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/content/projects/`,
      },
    },
  ],
};
