import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [initialProps.styles, sheet.getStyleElement()]
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/favicon/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/favicon/site.webmanifest" />
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
                    <meta name="msapplication-TileColor" content="#000000" />
                    <meta name="theme-color" content="#000000" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
