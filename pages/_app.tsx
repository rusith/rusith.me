import "styles/main.scss"
import "styles/syntax.css"

function MyApp({ Component, pageProps }) {
  return <>
      <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML"></script>
      <Component {...pageProps} />
  </>
}

export default MyApp
