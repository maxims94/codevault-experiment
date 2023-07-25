"use client"

import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import Link from 'next/link';

const data: any[] =
[
  {
    "title": "Solana Developers: Program Examples",
    "desc": " A repository of Solana program examples",
    "link": "https://github.com/solana-developers/program-examples",
    "tags": {
      "prog-lang": ["TypeScript", "Rust", "Python"],
      "framework": ["Anchor", "Seahorse"],
      "tech": [],
      "sector": []
    }
  },
  {
    "title": "Solana MobileConnect: WalletConnect for Solana",
    "desc": "Connect a mobile wallet with a dApp running on your desktop",
    "link": "https://github.com/Solana-MobileConnect",
    "tags": {
      "prog-lang": ["TypeScript"],
      "framework": ["Web3.js", "React.js", "Next.js"],
      "tech": ["Solana Pay", "Wallet adapter", "NFT", "Metaplex"],
      "sector": ["Mobile", "Commerce"]
    }
  }
]

export default function Home() {

  return (
    <main>
      <div className="max-w-screen-xl p-3">
        <h1 className="text-5xl mb-3">Results</h1>
        {
          data.map(item => 
            <div key={item.title} className="border border-slate-500 mb-5">
              <div className="text-xl font-bold">{item.title}</div>
              <div>Link: {item.link !== undefined ? <Link href={item.link} target="_blank" className="underline">{item.link}</Link> : "None"}</div>
              <div>Desc: {item.desc ?? "None"}</div>
              <div>Tags:</div>
              {
                Object.entries(item.tags).map(([key, value]) => (
                  <div key={key}><b>{key}</b>: {value.join(', ')}</div>
                ))
              }
           </div>
          )
        }
      </div>

    </main>
  )
}

