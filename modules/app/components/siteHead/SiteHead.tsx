import React from "react"
import Head from "next/head"
import { description, url, defaultBanner, twitterHandle, isPord, title } from "consts"

const SiteHead: React.FC = () => {
    function rendergTag() {
        if (!isPord) {return null}

        return (
            <>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-5GDZWWBRFX"></script>
                <script dangerouslySetInnerHTML={{ __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-5GDZWWBRFX');
                `}}>
                </script>
            </>

        )
    }

    return (
        <Head>
            <title>{title}</title>
            <link href="https://gmpg.org/xfn/11" rel="profile" />
            {rendergTag()}

            <link rel="apple-touch-icon-precomposed" sizes="144x144" href={`${url}/icons/favicon-144-image.png`}/>
            <link rel="shortcut icon" href={`${url}/icons/favicon.ico`} />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />

            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

            <meta name="description" content={description} key="description" />
            <link rel="canonical" href={url} key="canonical" />
            <meta property="og:title" content={title} key="og_title" />
            <meta property="og:url" content={url} key="og_url" />
            <meta property="og:description" content={description} key="og_description" />
            <meta property="twitter:description" content={description} key="twitter_description" />
            <meta property="og:image" content={defaultBanner} key="og_image" />
            <meta name="twitter:card" content="summary_large_image" key="twitter_card" />

            <meta property="twitter:creator" content={twitterHandle} />
            <meta name="robots" content="index,follow" key="robots" />
        </Head>
    )
}

export default SiteHead