"use client"

import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import solana_icon from '@/img/solana-icon.svg';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

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
        "tech": ["Cryptography", "Merkle tree"],
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

for (const tag_group_id in TAG_GROUPS_NAME) {

  const all_tags: any = []

  for (const data_item of data) {

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

/*
const TAG_GROUPS_COLOR: any = {
  "prog-lang": "tag_group_1_color",
  "framework": "tag_group_2_color",
  "tech": "tag_group_3_color",
}
*/

/*
const TAG_GROUPS_COLOR: any = {
  "prog-lang": "green-500",
  "framework": "red-500",
  "tech": "blue-500",
}
*/

const TAG_GROUPS_CLASS: any = {
  "prog-lang": "tag_group_1_button",
  "framework": "tag_group_2_button",
  "tech": "tag_group_3_button",
}


const tagsFilterInit: { [index: string]: String[] } = {}
for (const tag_group_id in TAG_GROUPS_NAME) {
  tagsFilterInit[tag_group_id] = []
}

export default function Home() {

  const [tagsFilter, setTagsFilter] = useState<{ [index: string]: String[] }>(tagsFilterInit)

  const handleCheckboxClick = (group_id: string, tag: string) => {
    return (event: any) => {
      if (event.target.checked) {
        setTagsFilter({ ...tagsFilter, [group_id]: [...tagsFilter[group_id], tag] })
        console.log(tagsFilter)
      } else {
        setTagsFilter({ ...tagsFilter, [group_id]: tagsFilter[group_id].filter(x => x !== tag) })
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
    <div className={"flex flex-row justify-center text-white " + inter.className}>
      <main className="max-w-screen-xl">

        <div className="flex flex-row mt-10 items-center">
          <Image src={solana_icon} alt="Solana" width={50} />
          <h1 className="text-[25px] ml-[10px]">OpenSource</h1>
        </div>

        <div className="mb-10">
          <h1 className="text-[60px] mb-5 mt-20">Search for Open Source projects built on Solana!</h1>
          {
            Object.entries(TAG_GROUPS_NAME).map(([group_id, group_name]) => (
              <div key={group_id}>
                <h2 className="text-4xl mb-6">Choose {group_name as string}:</h2>
                <div className="flex flex-row flex-wrap mb-10">
                  {
                    TAG_GROUPS_TAGS[group_id].map((tag: string) => (
                      <div key={tag} className={"flex flex-row flex-nowrap mr-5 mb-4 text-xl " + TAG_GROUPS_CLASS[group_id]}>
                        <input type="checkbox" id={tag} name={tag} value={tag} checked={tagsFilter[group_id].includes(tag)} onChange={handleCheckboxClick(group_id, tag)} />
                        <label htmlFor={tag} className="ml-2">{tag}</label>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }

        </div>

        <div className="mb-5">
          <h1 className="text-5xl mb-10">Results ({filteredData.length})</h1>
          {
            filteredData.map(item =>
              <a key={item.title} className="block border border-[#323232] mb-10 rounded-xl bg-[#141414] p-8" href={item.link} target="_blank">
                <div className="text-4xl mb-3">{item.title}</div>
                <div className="text-2xl mb-8">{item.desc ?? "---"}</div>
                <div className="flex flex-row flex-wrap">
                {
                  Object.entries(item.tags).map(([key, value]) => (
                    (value as string[]).map(function(tag: string) {
                      return <div key={tag} className={"mr-5 mb-4 text-xl " + TAG_GROUPS_CLASS[key]}>{tag}</div>
                    })
                  ))
                }
                </div>
              </a>
            )
          }
        </div>

      </main>
    </div>
  )
}

