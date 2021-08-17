---
id: docusaurus-core
title: Docusaurus Client API
sidebar_label: Client API
---

Docusaurus provides some APIs on the clients that can be helpful to you when building your site.

## Components {#components}

### `<Head/>` {#head}

This reusable React component will manage all of your changes to the document head. It takes plain HTML tags and outputs plain HTML tags and is beginner-friendly. It is a wrapper around [React Helmet](https://github.com/nfl/react-helmet).

Usage Example:

```jsx {2,5,10}
import React from 'react';
import Head from '@docusaurus/Head';

const MySEO = () => (
  <Head>
    <meta property="og:description" content="My custom description" />
    <meta charSet="utf-8" />
    <title>My Title</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Head>
);
```

Nested or latter components will override duplicate usages:

```jsx {2,5,8,11}
<Parent>
  <Head>
    <title>My Title</title>
    <meta name="description" content="Helmet application" />
  </Head>
  <Child>
    <Head>
      <title>Nested Title</title>
      <meta name="description" content="Nested component" />
    </Head>
  </Child>
</Parent>
```

Outputs:

```html
<head>
  <title>Nested Title</title>
  <meta name="description" content="Nested component" />
</head>
```

### `<Link/>` {#link}

This component enables linking to internal pages as well as a powerful performance feature called preloading. Preloading is used to prefetch resources so that the resources are fetched by the time the user navigates with this component. We use an `IntersectionObserver` to fetch a low-priority request when the `<Link>` is in the viewport and then use an `onMouseOver` event to trigger a high-priority request when it is likely that a user will navigate to the requested resource.

The component is a wrapper around react-router’s `<Link>` component that adds useful enhancements specific to Docusaurus. All props are passed through to react-router’s `<Link>` component.

External links also work, and automatically have these props: `target="_blank" rel="noopener noreferrer"`.

```jsx {2,7}
import React from 'react';
import Link from '@docusaurus/Link';

const Page = () => (
  <div>
    <p>
      Check out my <Link to="/blog">blog</Link>!
    </p>
    <p>
      Follow me on <Link to="https://twitter.com/docusaurus">Twitter</Link>!
    </p>
  </div>
);
```

#### `to`: string {#to-string}

The target location to navigate to. Example: `/docs/introduction`.

```jsx
<Link to="/courses" />
```

### `<Redirect/>` {#redirect}

Rendering a `<Redirect>` will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do. You can refer to [React Router's Redirect documentation](https://reacttraining.com/react-router/web/api/Redirect) for more info on available props.

Example usage:

```jsx {2,5}
import React from 'react';
import {Redirect} from '@docusaurus/router';

const Home = () => {
  return <Redirect to="/docs/test" />;
};
```

:::note

`@docusaurus/router` implements [React Router](https://reacttraining.com/react-router/web/guides/quick-start) and supports its features.

:::

### `<BrowserOnly/>` {#browseronly}

The `<BrowserOnly>` component permits to render React components only in the browser, after the React app has hydrated.

:::tip

Use it for integrating with code that can't run in Node.js, because `window` or `document` objects are being accessed.

:::

#### Props {#browseronly-props}

- `children`: render function prop returning browser-only JSX. Will not be executed in Node.js
- `fallback` (optional): JSX to render on the server (Node.js) and until React hydration completes.

#### Example with code {#browseronly-example-code}

```jsx
// highlight-start
import BrowserOnly from '@docusaurus/BrowserOnly';
// highlight-end

const MyComponent = () => {
  return (
    // highlight-start
    <BrowserOnly>
      {() => {
        <span>page url = {window.location.href}</span>;
      }}
    </BrowserOnly>
    // highlight-end
  );
};
```

#### Example with a library {#browseronly-example-library}

```jsx
// highlight-start
import BrowserOnly from '@docusaurus/BrowserOnly';
// highlight-end

const MyComponent = (props) => {
  return (
    // highlight-start
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const LibComponent = require('some-lib').LibComponent;
        return <LibComponent {...props} />;
      }}
    </BrowserOnly>
    // highlight-end
  );
};
```

### `<Interpolate/>` {#interpolate}

A simple interpolation component for text containing dynamic placeholders.

The placeholders will be replaced with the provided dynamic values and JSX elements of your choice (strings, links, styled elements...).

#### Props {#interpolate-props}

- `children`: text containing interpolation placeholders like `{placeholderName}`
- `values`: object containing interpolation placeholder values

```jsx
import React from 'react';
import Link from '@docusaurus/Link';
import Interpolate from '@docusaurus/Interpolate';

export default function VisitMyWebsiteMessage() {
  return (
    // highlight-start
    <Interpolate
      values={{
        firstName: 'Sébastien',
        website: (
          <Link to="https://docusaurus.io" className="my-website-class">
            website
          </Link>
        ),
      }}>
      {'Hello, {firstName}! How are you? Take a look at my {website}'}
    </Interpolate>
    // highlight-end
  );
}
```

### `<Translate/>` {#translate}

When [localizing your site](./i18n/i18n-introduction.md), the `<Translate/>` component will allow providing **translation support to React components**, such as your homepage. The `<Translate>` component supports [interpolation](#interpolate).

The translation strings will be extracted from your code with the [`docusaurus write-translations`](./cli.md#docusaurus-write-translations-sitedir) CLI and create a `code.json` translation file in `website/i18n/<locale>`.

:::note

The `<Translate/>` props **must be hardcoded strings**.

Apart the `values` prop used for interpolation, it is **not possible to use variables**, or the static extraction wouldn't work.

:::

#### Props {#translate-props}

- `children`: untranslated string in the default site locale (can contain [interpolation placeholders](#interpolate))
- `id`: optional value to use as key in JSON translation files
- `description`: optional text to help the translator
- `values`: optional object containing interpolation placeholder values

#### Example {#example}

```jsx title="src/pages/index.js"
import React from 'react';
import Layout from '@theme/Layout';

// highlight-start
import Translate from '@docusaurus/Translate';
// highlight-end

export default function Home() {
  return (
    <Layout>
      <h1>
        {/* highlight-start */}
        <Translate
          id="homepage.title"
          description="The homepage welcome message">
          Welcome to my website
        </Translate>
        {/* highlight-end */}
      </h1>
      <main>
        {/* highlight-start */}
        <Translate values={{firstName: 'Sébastien'}}>
          {'Welcome, {firstName}! How are you?'}
        </Translate>
        {/* highlight-end */}
      </main>
    </Layout>
  );
}
```

## Hooks {#hooks}

### `useDocusaurusContext` {#usedocusauruscontext}

React hook to access Docusaurus Context. Context contains `siteConfig` object from [docusaurus.config.js](api/docusaurus.config.js.md), and some additional site metadata.

```ts
type DocusaurusPluginVersionInformation =
  | {readonly type: 'package'; readonly version?: string}
  | {readonly type: 'project'}
  | {readonly type: 'local'}
  | {readonly type: 'synthetic'};

interface DocusaurusSiteMetadata {
  readonly docusaurusVersion: string;
  readonly siteVersion?: string;
  readonly pluginVersions: Record<string, DocusaurusPluginVersionInformation>;
}

interface I18nLocaleConfig {
  label: string;
  direction: string;
}

interface I18n {
  defaultLocale: string;
  locales: [string, ...string[]];
  currentLocale: string;
  localeConfigs: Record<string, I18nLocaleConfig>;
}

interface DocusaurusContext {
  siteConfig: DocusaurusConfig;
  siteMetadata: DocusaurusSiteMetadata;
  globalData: Record<string, unknown>;
  i18n: I18n;
  codeTranslations: Record<string, string>;
}
```

Usage example:

```jsx {5,8-10}
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const MyComponent = () => {
  const {siteConfig, siteMetadata} = useDocusaurusContext();
  return (
    <div>
      <h1>{siteConfig.title}</h1>
      <div>{siteMetadata.siteVersion}</div>
      <div>{siteMetadata.docusaurusVersion}</div>
    </div>
  );
};
```

### `useIsBrowser` {#useIsBrowser}

Returns `true` when the React app has successfully hydrated in the browser.

:::caution

Use this hook instead of `typeof windows !== 'undefined'` in React rendering logic.

The first client-side render output (in the browser) **must be exactly the same** as the server-side render output (Node.js).

Not following this rule can lead to unexpected hydration behaviors, as described in [The Perils of Rehydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/).

:::

Usage example:

```jsx
import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

const MyComponent = () => {
  // highlight-start
  const isBrowser = useIsBrowser();
  // highlight-end
  return <div>{isBrowser ? 'Client' : 'Server'}</div>;
};
```

### `useBaseUrl` {#usebaseurl}

React hook to prepend your site `baseUrl` to a string.

:::caution

**Don't use it for regular links!**

The `/baseUrl/` prefix is automatically added to all **absolute paths** by default:

- Markdown: `[link](/my/path)` will link to `/baseUrl/my/path`
- React: `<Link to="/my/path/">link</Link>` will link to `/baseUrl/my/path`

:::

#### Options {#options}

```ts
type BaseUrlOptions = {
  forcePrependBaseUrl: boolean;
  absolute: boolean;
};
```

#### Example usage: {#example-usage}

```jsx
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const SomeImage = () => {
  // highlight-start
  const imgSrc = useBaseUrl('/img/myImage.png');
  // highlight-end
  return <img src={imgSrc} />;
};
```

:::tip

In most cases, you don't need `useBaseUrl`.

Prefer a `require()` call for [assets](./guides/markdown-features/markdown-features-assets.mdx):

```jsx
<img src={require('@site/static/img/myImage.png').default} />
```

:::

### `useBaseUrlUtils` {#usebaseurlutils}

Sometimes `useBaseUrl` is not good enough. This hook return additional utils related to your site's base url.

- `withBaseUrl`: useful if you need to add base urls to multiple urls at once.

```jsx
import React from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

const Component = () => {
  const urls = ['/a', '/b'];
  // highlight-start
  const {withBaseUrl} = useBaseUrlUtils();
  const urlsWithBaseUrl = urls.map(withBaseUrl);
  // highlight-end
  return <div>{/* ... */}</div>;
};
```

### `useGlobalData` {#useglobaldata}

React hook to access Docusaurus global data created by all the plugins.

Global data is namespaced by plugin name, and plugin id.

:::info

Plugin id is only useful when a plugin is used multiple times on the same site. Each plugin instance is able to create its own global data.

:::

```ts
type GlobalData = Record<
  PluginName,
  Record<
    PluginId, // "default" by default
    any // plugin-specific data
  >
>;
```

Usage example:

```jsx {2,5-7}
import React from 'react';
import useGlobalData from '@docusaurus/useGlobalData';

const MyComponent = () => {
  const globalData = useGlobalData();
  const myPluginData = globalData['my-plugin']['default'];
  return <div>{myPluginData.someAttribute}</div>;
};
```

:::tip

Inspect your site's global data at `./docusaurus/globalData.json`

:::

### `usePluginData` {#useplugindata}

Access global data created by a specific plugin instance.

This is the most convenient hook to access plugin global data, and should be used most of the time.

`pluginId` is optional if you don't use multi-instance plugins.

```ts
usePluginData(pluginName: string, pluginId?: string)
```

Usage example:

```jsx {2,5-6}
import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';

const MyComponent = () => {
  const myPluginData = usePluginData('my-plugin');
  return <div>{myPluginData.someAttribute}</div>;
};
```

### `useAllPluginInstancesData` {#useallplugininstancesdata}

Access global data created by a specific plugin. Given a plugin name, it returns the data of all the plugins instances of that name, by plugin id.

```ts
useAllPluginInstancesData(pluginName: string)
```

Usage example:

```jsx {2,5-7}
import React from 'react';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

const MyComponent = () => {
  const allPluginInstancesData = useAllPluginInstancesData('my-plugin');
  const myPluginData = allPluginInstancesData['default'];
  return <div>{myPluginData.someAttribute}</div>;
};
```

## Functions {#functions}

### `interpolate` {#interpolate-1}

The imperative counterpart of the [`<Interpolate>`](#interpolate) component.

#### Signature {#signature}

```ts
// Simple string interpolation
function interpolate(text: string, values: Record<string, string>): string;

// JSX interpolation
function interpolate(
  text: string,
  values: Record<string, ReactNode>,
): ReactNode;
```

#### Example {#example-1}

```jsx
// highlight-start
import {interpolate} from '@docusaurus/Interpolate';
// highlight-end

const message = interpolate('Welcome {firstName}', {firstName: 'Sébastien'});
```

### `translate` {#translate-1}

The imperative counterpart of the [`<Translate>`](#translate) component. Also supporting [placeholders interpolation](#interpolate).

:::tip

Use the imperative API for the **rare cases** where a **component cannot be used**, such as:

- the page `title` metadata
- the `placeholder` props of form inputs
- the `aria-label` props for accessibility

:::

#### Signature {#signature-1}

```ts
function translate(
  translation: {message: string; id?: string; description?: string},
  values: Record<string, string>,
): string;
```

#### Example {#example-2}

```jsx title="src/pages/index.js"
import React from 'react';
import Layout from '@theme/Layout';

// highlight-start
import {translate} from '@docusaurus/Translate';
// highlight-end

export default function Home() {
  return (
    <Layout
      // highlight-start
      title={translate({message: 'My page meta title'})}
      // highlight-end
    >
      <img
        src={'https://docusaurus.io/logo.png'}
        aria-label={
          // highlight-start
          translate(
            {
              message: 'The logo of site {siteName}',
              // Optional
              id: 'homepage.logo.ariaLabel',
              description: 'The home page logo aria label',
            },
            {siteName: 'Docusaurus'},
          )
          // highlight-end
        }
      />
    </Layout>
  );
}
```

## Modules {#modules}

### `ExecutionEnvironment` {#executionenvironment}

A module which exposes a few boolean variables to check the current rendering environment.

:::caution

For React rendering logic, use [`useIsBrowser()`](#useIsBrowser) or [`<BrowserOnly>`](#browseronly) instead.

:::

Example:

```jsx
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  require('lib-that-only-works-client-side');
}
```

| Field | Description |
| --- | --- |
| `ExecutionEnvironment.canUseDOM` | `true` if on client/browser, `false` on Node.js/prerendering. |
| `ExecutionEnvironment.canUseEventListeners` | `true` if on client and has `window.addEventListener`. |
| `ExecutionEnvironment.canUseIntersectionObserver` | `true` if on client and has `IntersectionObserver`. |
| `ExecutionEnvironment.canUseViewport` | `true` if on client and has `window.screen`. |

### `constants` {#constants}

A module exposing useful constants to client-side theme code.

```jsx
import {DEFAULT_PLUGIN_ID} from '@docusaurus/constants';
```

| Named export        | Value     |
| ------------------- | --------- |
| `DEFAULT_PLUGIN_ID` | `default` |
