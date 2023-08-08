import './globals.css'

export const metadata = {
  title: 'Superteam OpenSource',
  description: 'Database of Solana Open Source projects'
}

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

import Image from 'next/image';

import solana_icon from '@/img/solana-icon.svg';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={"flex flex-row justify-center " + inter.className}>
          <main className="px-10 w-full max-w-screen-xl">

            <div className="flex flex-row py-10 mt-3 w-full items-center justify-between">
              <div className="flex flex-row items-center flex-nowrap">
                <Image src={solana_icon} alt="Solana" width={30} />
                <h1 className="text-2xl ml-3">OpenSource</h1>
              </div>
              <a href="https://airtable.com/appaWGnMf4eBJS9pb/shrLQ5YdZ55WAZ0uY" target="_blank" className="text-xl hover:underline">Add Project</a>
            </div>
            
            <h1 className="text-3xl mb-5 mt-5">Search for Open Source projects built on Solana!</h1>

            {children}
            
            <div className="min-h-[25px]"></div>

          </main>
        </div>
      </body>
    </html>
  )
}
