import Link from "next/link";
import React from "react";

export default function Home() {
  return (
      <h1>
          Rusith.Me Home Page
          
          <Link href="/blog/" >
              <a>Blog</a>
          </Link>
      </h1>
  )
}

