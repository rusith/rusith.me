import React from "react"
import Head from "next/head"
import {
  description,
  url,
  defaultBanner,
  twitterHandle,
  isPord,
  title,
  rusithFullName,
  profilePicture,
} from "consts"
import { getSchema as getPostSchema } from "modules/blog/components/post/Post"
import { IPost } from "modules/blog/models/IPost"

function getSchema(posts: IPost[]) {
  const schema = {
    "@context": "http://schema.org",
    "@type": "Blog",
    author: {
      "@type": "Person",
      name: rusithFullName,
      url: `${url}/about`,
    },
    blogPosts: posts ? posts.map(getPostSchema) : [],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: rusithFullName,
      url: url + "/about",
      logo: {
        "@type": "ImageObject",
        url: profilePicture,
      },
    },
  } as any

  return schema
}

const SiteHead: React.FC<{ allPosts: IPost[] }> = ({ allPosts }) => {
  function rendergTag() {
    if (!isPord) {
      return null
    }

    return (
      <>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5GDZWWBRFX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-5GDZWWBRFX');
                `,
          }}
        ></script>
      </>
    )
  }

  return (
    <Head>
      <title>{title}</title>
      <link href="https://gmpg.org/xfn/11" rel="profile" />
      {rendergTag()}

      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href={`${url}/icons/favicon-144-image.png`}
      />
      <link rel="shortcut icon" href={`${url}/favicon.ico`} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
      />

      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={url} key="canonical" />
      <meta property="og:title" content={title} key="og_title" />
      <meta property="og:url" content={url} key="og_url" />
      <meta
        property="og:site_name"
        content="Rusith's blog"
        key="og_site_name"
      />
      <meta property="og:locale" content="en_US" key="og_locale" />
      <meta property="og:type" content="blog" key="og_type" />
      <meta
        property="og:description"
        content={description}
        key="og_description"
      />
      <meta property="og:image" content={defaultBanner} key="og_image" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter_card"
      />
      <meta
        property="twitter:description"
        content={description}
        key="twitter_description"
      />
      <meta
        property="twitter:creator"
        content={twitterHandle}
        key="twitter_creator"
      />
      <meta name="twitter:title" content={title} key="twitter_title" />
      <meta name="twitter:image" content={defaultBanner} key="twitter_image" />
      <meta name="twitter:site" content={twitterHandle} key="twitter_site" />

      <meta name="robots" content="index,follow" key="robots" />

      <script
        key="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSchema(allPosts)),
        }}
      ></script>
    </Head>
  )
}

export default SiteHead
