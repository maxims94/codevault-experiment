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
      "tech": ["Pyth", "Token2022"],
    }
  },
  {
    "title": "Solana MobileConnect: WalletConnect for Solana",
    "desc": "Connect a mobile wallet with a dApp running on your desktop",
    "link": "https://github.com/Solana-MobileConnect",
    "tags": {
      "prog-lang": ["TypeScript"],
      "framework": ["Web3.js", "Next.js", "Wallet adapter"],
      "tech": ["Solana Pay", "NFT", "Metaplex", "Mobile"],
    }
  },
  {
      "title": "Candy Machine v2 Next.js Template",
      "desc": "Minting page template",
      "link": "https://github.com/updatesettings/nextjs-candy-machine-v2",
      "tags": {
        "prog-lang": ["TypeScript"],
        "framework": ["Web3.js", "Next.js", "Wallet adapter"],
        "tech": ["NFT", "Metaplex", "Candy Machine"],
      }
  },
  {
      "title": "Calling the Token Metadata Program",
      "desc": "Example on how to do CPI calls to mpl-token-metadata program",
      "link": "https://github.com/0xPratik/NFT",
      "tags": {
        "prog-lang": ["TypeScript", "Rust"],
        "framework": ["Anchor"],
        "tech": ["Token Metadata program", "Metaplex", "CPI"],
      }
  },
  {
      "title": "Solana RPC Discord Bot",
      "desc": "Discord Bot to use Solana RPC calls as commands",
      "link": "https://github.com/PuppyGamingDev/Solana-RPC-Discord-Bot",
      "tags": {
        "prog-lang": ["JavaScript"],
        "framework": ["Web3.js"],
        "tech": ["Discord"],
      }
  },
  {
      "title": "Dungeon3",
      "desc": "RPG game on Solana",
      "link": "https://github.com/aeither/dungeon3",
      "tags": {
        "prog-lang": ["TypeScript", "Python"],
        "framework": ["Seahorse", "Web3.js", "Wallet adapter", "Solana CLI", "Thirdweb"],
        "tech": ["NFT", "Gaming"],
      }
  },
  {
      "title": "xNFT scaffold",
      "desc": "Next.js template to create xNFTs for Backpack",
      "link": "https://github.com/builderz-labs/builderz-xNFT-scaffold-next",
      "tags": {
        "prog-lang": ["TypeScript"],
        "framework": ["Next.js", "Wallet adapter", "Web3.js"],
        "tech": ["xNFT"],
      }
  },
  {
      "title": "Connect Four Game",
      "desc": "The Connect Four game implemented as Solana Program",
      "link": "https://github.com/Gajesh2007/ConnectFour",
      "tags": {
        "prog-lang": ["Rust"],
        "framework": [],
        "tech": ["Gaming"],
      }
  },
  {
      "title": "Solana RPC calls with Rust",
      "desc": "Demonstrating how to use Rust to make Solana RPC calls",
      "link": "https://github.com/ronanyeah/solana-rust-examples/tree/master",
      "tags": {
        "prog-lang": ["Rust"],
        "framework": [],
        "tech": ["RPC"],
      }
  },
  {
      "title": "Bunkr - On-chain 2FA",
      "desc": "Secure your on-chain assets with 2FA",
      "link": "https://github.com/Bunkr-On-Chain-2FA/bunkr-program",
      "tags": {
        "prog-lang": ["TypeScript", "Rust"],
        "framework": ["Anchor", "Web3.js", "Solita"],
        "tech": ["Cryptography", "Metaplex", "SPL Token", "Merkle tree"],
      }
  },
  {
      "title": "Openbook Solana program",
      "desc": "Order book DEX on Solana",
      "link": "https://github.com/openbook-dex/program",
      "tags": {
        "prog-lang": ["Rust"],
        "framework": ["Anchor"],
        "tech": ["DeFi"],
      }
  },
  {
      "title": "Dexterity",
      "desc": "Reference implementation of a decentralized exchange",
      "link": "https://github.com/solana-labs/dexterity",
      "tags": {
        "prog-lang": ["Rust"],
        "framework": ["Anchor"],
        "tech": ["DeFi"],
      }
  },
  {
      "title": "Track and notify NFT sales to Discord",
      "desc": "Monitor sales of Solana NFT Collections and send corresponding notifications to Discord",
      "link": "https://github.com/t4top/solana-nft-sales-monitor",
      "tags": {
        "prog-lang": ["JavaScript"],
        "framework": ["Web3.js"],
        "tech": ["Discord", "NFT", "Metaplex", "Token Metadata program"],
      }
  },
  {
      "title": "Accept payments with Solana Pay on WooCommerce stores",
      "desc": "A payment gateway built for WordPress as a WooCommerce plugin for online stores to accept payments in USDC, SOL and more through Solana Pay",
      "link": "https://github.com/t4top/solana-pay-for-woocommerce",
      "tags": {
        "prog-lang": ["PHP", "JavaScript"],
        "framework": ["Svelte"],
        "tech": ["Solana Pay", "Payment"],
      }
  }
]

/*
const TAG_GROUPS_NAME: any = {
  "prog-lang": "Programming language",
  "framework": "Tool",
  "tech": "Topic",
  "sector": "Sector"
}
*/

const TAG_GROUPS_NAME: any = {
  "prog-lang": "Language",
  "framework": "Tool",
  "tech": "Topic",
}

const TAG_GROUPS_TAGS: any = {}

for(const tag_group_id in TAG_GROUPS_NAME) {

  const all_tags: any = []

  for(const data_item of data) {

    const data_item_tags = (data_item as any).tags[tag_group_id] 

    for (const new_tag of data_item_tags) {
      if (!all_tags.includes(new_tag)) {
        all_tags.push(new_tag)
      }
    }
  }

  TAG_GROUPS_TAGS[tag_group_id] = all_tags
}

//console.log(TAG_GROUPS_TAGS)

const tagsFilterInit: { [index: string]: String[]} = {}
for(const tag_group_id in TAG_GROUPS_NAME) {
  tagsFilterInit[tag_group_id] = []
}

export default function Home() {
  
  const [tagsFilter, setTagsFilter] = useState<{ [index: string]: String[]}>(tagsFilterInit)
  
  const handleCheckboxClick = (group_id: string, tag: string) => {
    return (event: any) => {
      if(event.target.checked) {
        setTagsFilter({...tagsFilter, [group_id]: [...tagsFilter[group_id], tag]})
        console.log(tagsFilter)
      } else {
        setTagsFilter({...tagsFilter, [group_id]: tagsFilter[group_id].filter(x => x !== tag)})
        console.log(tagsFilter)
      }
    }
  }

  // "and" over groups and "or" inside a group
  const filteredData = data.filter(item => 
    Object.entries(item.tags).every(([group_id, group_tags]) => 
      !(group_id in tagsFilter) || tagsFilter[group_id].length === 0 || (group_tags as string[]).some(tag => tagsFilter[group_id].includes(tag))
    )
  )

  return (
    <main>

      <div className="max-w-screen-xl p-3">
        <h1 className="text-5xl mb-3">Filter</h1>
        {
          Object.entries(TAG_GROUPS_NAME).map(([group_id, group_name]) => (
            <div key={group_id}>
              <h2 className="text-3xl mb-1">Choose {group_name as string}</h2>
              <div className="flex flex-row flex-wrap mb-3">
                {
                  TAG_GROUPS_TAGS[group_id].map((tag: string) => (
                    <div key={tag} className="flex flex-row flex-nowrap mr-3">
                      <input type="checkbox" id={tag} name={tag} value={tag} checked={tagsFilter[group_id].includes(tag)} onChange={handleCheckboxClick(group_id, tag)}/>
                      <label htmlFor={tag} className="ml-1">{tag}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }

      </div>

      <div className="max-w-screen-xl p-3">
        <h1 className="text-5xl mb-3">Results</h1>
        <p className="text-3xl mb-3">Number of results: {filteredData.length}</p>
        {
          filteredData.map(item => 
            <div key={item.title} className="border border-slate-500 mb-5">
              <div className="text-xl font-bold">{item.title}</div>
              <div>Link: {item.link !== undefined ? <Link href={item.link} target="_blank" className="underline">{item.link}</Link> : "None"}</div>
              <div>Desc: {item.desc ?? "None"}</div>
              <div>Tags:</div>
              {
                Object.entries(item.tags).map(([key, value]) => (
                  <div key={key}><b>{key}</b>: {(value as string[]).join(', ')}</div>
                ))
              }
           </div>
          )
        }
      </div>

    </main>
  )
}

