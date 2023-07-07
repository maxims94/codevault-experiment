"use client"

import { useEffect, useRef, useState } from 'react';

export default async function Home() {

  const [data, setData] = useState<any[] | null>(null)
  const dataLoaded = useRef<boolean>(false)

  useEffect(() => {
    console.log(dataLoaded.current)
    if (dataLoaded.current) {
      return
    } else {
      dataLoaded.current = true;
      (async () => {
        console.log("fetch data")
        const res = await fetch('/test-database.json', {cache: 'force-cache'})
        console.log(res)
        const content: any[] = await res.json() as any[]
  
        console.log(content)
        setData(content)
  
        console.log(data)
      })()
    }
  }, [])

  console.log(data)
  return (
    <main>
      <h1>Filter</h1>
      <h1>Results</h1>
      {
        data !== null ? data.map(item => <div key={item.title}>{item.title}</div>) : null
      }

    </main>
  )
}