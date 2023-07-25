"use client"

import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import Link from 'next/link';

import data from '@/public/database.json';

const data: any[] = [

  "title": "Solana Developers: Program Examples",
  "desc": " A repository of Solana program examples",
  "link": "https://github.com/solana-developers/program-examples",
  "tags": {
    "prog-lang": ["JavaScript", "TypeScript", "Rust", "HTML/CSS"],
    "framework": ["Anchor", "React"]
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
              <div>Desc: {item.desc ?? "None"}</div>
              <div>Tags:</div>
              <div>Link: {item.link !== undefined ? <Link href={item.link} target="_blank" className="underline">{item.link}</Link> : "None"}</div>
           </div>
          )
        }
      </div>

    </main>
  )
}

            /*
              {
                Object.entries(item.tags).map([key, value] => (
                  <div>{key}: {value.join(', ')}</div>
                ))
              }
              */
