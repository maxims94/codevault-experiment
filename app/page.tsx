"use client"

import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import Link from 'next/link';

const data: any[] = require('@/public/test-database.json')

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
