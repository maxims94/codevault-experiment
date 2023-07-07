"use client"

import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import Link from 'next/link';

const data: any[] = [
  {
      "title": "Solana Developers: Program Examples",
      "desc": " A repository of Solana program examples",
      "link": "https://github.com/solana-developers/program-examples",
      "tags": ["anchor", "seahorse", "transfer-sol", "pda", "cpi", "create-account", "account-checks", "pyth", "cnft", "transfer", "spl-token", "freeze-token", "update-authority", "token2022", "mint-authority", "mint-close-authority", "token2022-extension", "non-transferable-extension", "transfer-token2022", "transfer", "token-mint", "system-program"],
      "content": {
          "Close account (Rust)": "https://github.com/solana-developers/program-examples/tree/main/basics/close-account/native",
          "Pyth: Get price of SOL (Anchor)": "https://github.com/solana-developers/program-examples/tree/main/oracles/pyth/anchor",
          "Transfer cNFT (Anchor)": "https://github.com/solana-developers/program-examples/tree/main/compression/cnft-vault/anchor"
      }
  },
  {
      "title": "Create / Close Account in Rust",
      "desc": "How to create and close an account in Rust",
      "link": "https://github.com/solana-developers/program-examples/tree/main/basics/close-account/native",
      "tags": ["rust", "close-account", "create-account", "pda"],
      "long_desc": "Pyth is an Oracle that offers on-chain low-latency market data from institutional sources. This means you can use prices from real-life assets in your Solana programs. The price for each asset will be represented inside of a Solana account. We call those accounts price feeds.",
      "content": {
          "Instruction: create account": "https://github.com/solana-developers/program-examples/blob/main/basics/close-account/native/program/src/instructions/create_user.rs",
          "Instruction: close account": "https://github.com/solana-developers/program-examples/blob/main/basics/close-account/native/program/src/instructions/close_user.rs",
          "processor.rs": "https://github.com/solana-developers/program-examples/blob/main/basics/close-account/native/program/src/processor.rs"
      }
  },
  {
      "title": "Pyth: Get price of SOL",
      "desc": "Use the Pyth oracle to get the current market price of SOL",
      "link": "https://github.com/solana-developers/program-examples/tree/main/oracles/pyth",
      "tags": ["anchor", "seahorse", "solana-program", "oracle", "pyth", "market-price"],
      "content": {
          "Read price (Anchor)": "https://github.com/solana-developers/program-examples/blob/main/oracles/pyth/anchor/programs/pythexample/src/lib.rs",
          "Read price (Seahorse)": "https://github.com/solana-developers/program-examples/blob/main/oracles/pyth/seahorse/programs_py/seahorse.py"        }
  },
  {
      "title": "Token2022: Mint and mint close authority",
      "desc": "Mint a token according to the Token 2022 standard and set the mint and mint close authority",
      "link": "https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/mint-close-authority/native",
      "tags": ["token2022", "token-mint", "Token Mint", "mint-authority", "mint-close-authority", "Mint Authority", "Mint Close Authority", "Token 2022"],
      "content": {
          "lib.rs": "https://github.com/solana-developers/program-examples/blob/main/tokens/token-2022/mint-close-authority/native/program/src/lib.rs",
          "tests.ts": "https://github.com/solana-developers/program-examples/blob/main/tokens/token-2022/mint-close-authority/native/tests/test.ts"
      }
  },
  {
      "title": "updatesettings: Next.js Candy Machine v2 Template",
      "desc": "Cards by Update Settings is an NFT project to provide a working example of using the Candy Machine v2 Next.js Template.",
      "link": "https://github.com/updatesettings/nextjs-candy-machine-v2",
      "tags": ["nextjs", "candy-machine-v2", "mint-nft", "mint-token", "nft"],
      "content": {
      }
  },
  {
      "title": "0xPratik: NFT",
      "desc": "Example on how to do CPI calls to mpl-token-metadata program",
      "link": "https://github.com/0xPratik/NFT",
      "tags": ["anchor", "solana-program", "cpi"],
      "content": {
          "Main": "https://github.com/0xPratik/NFT/blob/master/programs/mpl-testing/src/lib.rs"
      }
  },
  {
      "title": "Solana RPC Discord Bot",
      "desc": "Discord Bot to use Solana RPC calls as commands ",
      "link": "https://github.com/PuppyGamingDev/Solana-RPC-Discord-Bot",
      "tags": ["web3.js", "discord-bot", "rpc"],
      "long_desc": "This bot covers the RPC calls for Solana using the @solana/web3.js package for easily testing calls and checking responses from right inside Discord without needing to write CURL requests and such. Also it was for fun.",
      "content": {
      }
  },
  {
      "title": "Dungeon3: RPG game on Solana",
      "desc": "RPG game on Solana",
      "link": "https://github.com/aeither/dungeon3",
      "tags": ["game", "seahorse", "thirdweb", "kaboom", "solana-cli", "mint-nft"],
      "content": {
          "Tutorial": "https://techswift.pro/build-an-rpg-game-on-solana",
          "Seahorse program": "https://github.com/aeither/dungeon3/blob/main/program/dungeon3.py"
      }
  },
  {
      "title": "Builderz Solana xNFT Scaffold",
      "desc": "This is our open source Next.js , Solana xNFT Backpack Scaffold for the community and whole ecosystem - without much fluff and just the essentials.",
      "link": "https://github.com/builderz-labs/builderz-xNFT-scaffold-next",
      "tags": ["nextjs", "xnft", "web3.js", "template"],
      "content": {
          "Live demo": "https://builderz-x-nft-scaffold-next.vercel.app/"
      }
  },
  {
      "title": "Connect Four Game on Solana",
      "desc": "Connect Four Game on Solana",
      "link": "https://github.com/Gajesh2007/ConnectFour",
      "tags": ["game", "rust", "solana-program"],
      "content": {
          "Main": "https://github.com/Gajesh2007/ConnectFour/blob/master/src/lib.rs"
      }
  },
  {
      "title": "Rust Solana RPC Examples",
      "desc": "Demonstrating how to use Rust to interact with the Solana blockchain. / Using Rust to make RPC calls",
      "link": "https://github.com/ronanyeah/solana-rust-examples/tree/master",
      "tags": ["rpc", "get-owner-of-nft", "list-nfts", "update-nft-metadata", "rust"],
      "content": {
          "Get the creation date of an account": "https://github.com/ronanyeah/solana-rust-examples/blob/master/src/bin/creation_date.rs",
          "Get token balance": "https://github.com/ronanyeah/solana-rust-examples/blob/master/src/bin/associated_token_balance.rs"
      }
  },
  {
      "title": "Bunkr",
      "desc": "On-Chain 2FA for Assets on Solana",
      "link": "https://github.com/Bunkr-On-Chain-2FA/bunkr-program",
      "tags": ["rust", "cryptography", "solita", "amman", "token-program"],
      "content": {}
  },
  {
      "title": "Automated Market Maker + Swap",
      "desc": "Automated Market Maker + Swap",
      "link": "https://github.com/solana-labs/oyster-swap",
      "tags": ["amm", "swap", "defi", "frontend", "typescript"],
      "content": {}
  },
  {
      "title": "Borrow / Lend",
      "desc": "Borrow / Lend",
      "link": "https://github.com/solana-labs/oyster-lending/tree/main",
      "tags": ["borrow-lend", "defi", "frontend", "typescript"],
      "content": {}
  }
]

const tags: String[] = data.flatMap(x => x.tags ?? [])

let tags_unique: any[] = [];

tags.forEach(item => {
  if (!tags_unique.includes(item)) {
    tags_unique.push(item)
  }
});

export default function Home() {

  const [tagsFilter, setTagsFilter] = useState<String[]>([])

  const handleCheckboxChange = (event: any) => {
    if(event.target.checked) {
      setTagsFilter([...tagsFilter, event.target.value])
    } else {
      setTagsFilter(tagsFilter.filter(x => x !== event.target.value))
    }
  }

  const filteredData = tagsFilter.length === 0 ? data : data.filter(item => item.tags !== undefined && tagsFilter.every(tag => item.tags.includes(tag)))

  return (
    <main>
      <div className="max-w-screen-xl p-3">
        <h1 className="text-5xl mb-3">Filter</h1>
        {
         tags_unique.map(item => 
          <label key={item} className="block mr-3">
            <input value={item} type="checkbox" className="mr-2" checked={tagsFilter.includes(item)} onChange={handleCheckboxChange}/>
            {item}
          </label>
         )
        }
      </div>
      <div className="max-w-screen-xl p-3">
        <h1 className="text-5xl mb-3">Results</h1>
        {
          filteredData.map(item => 
            <div key={item.title} className="border border-slate-500 mb-5">
              <div className="text-xl font-bold">{item.title}</div>
              <div>Desc: {item.desc ?? "None"}</div>
              <div>Long desc: {item.long_desc ?? "None"}</div>
              <div>Tags: <span className="font-bold">{item.tags !== undefined ? item.tags.join(', ') : 'None'}</span></div>
              <div>Link: {item.link !== undefined ? <Link href={item.link} target="_blank" className="underline">{item.link}</Link> : "None"}</div>
              <div>Content: 
              {
                 item.content !== undefined ? 
                 Object.entries(item.content).map(([label, url]) =>
                   <Link key={label} href={url as any} target="_blank" className="underline block">{label}</Link>
                 ) : 'None'
              }
              </div>
           </div>
          )
        }
      </div>

    </main>
  )
}
