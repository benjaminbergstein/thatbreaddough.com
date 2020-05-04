import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <link rel="apple-touch-icon" sizes="57x57" href="icons/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="icons/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="icons/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="icons/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="icons/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="icons/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="icons/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="icons/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="icons/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png"/>
          <link rel="manifest" href="icons/manifest.json"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="icons/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="description" content="Improve your recipes and techniques to bake amazing, delicious and perfect sourdough bread. This sourdough bread dough timer helps you track how long your dough rested between mixing, folding, proofing and baking. Use this timer to help you understand what worked and did not work when baking beautiful, naturally-leavened loaves. Learn more about techniques for bread making in our sourdough bread glossary of terms and additional resources." />
          <style>{`
            #__next { height: 100% }
          `}</style>
        </Head>
        <body style={{ margin: 0, height: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
