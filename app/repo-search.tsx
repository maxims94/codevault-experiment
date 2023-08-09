"use client"

import { useState } from "react"
import RepoInput from "./repo-input"
import { TAG_GROUP_TW_CLASS, TAG_GROUP_KEYS } from "./tag-groups"

export default function RepoSearch({ data, allTags }: { data: any[], allTags: any}) {

  const [tagsFilter, setTagsFilter] = useState<{ [index: string]: string[] }>(() => {
    const init: { [index: string]: string[] } = {}
    for (const key in TAG_GROUP_KEYS) {
      init[key] = []
    }
    return init
  })
  
  // "and" over groups and "or" inside a group
  const filteredData = data.filter(item =>
    Object.entries(item.tags).every(([group_id, group_tags]) =>
      !(group_id in tagsFilter) || tagsFilter[group_id].length === 0 || (group_tags as string[]).some(tag => tagsFilter[group_id].includes(tag))
    )
  )
  
  // sort data inplace by created-on date
  filteredData.sort((a, b) => {
    return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
  })

  return (
  
    <div className="mb-5">
      <RepoInput allTags={allTags} tagsFilter={tagsFilter} setTagsFilter={setTagsFilter} />

      <h1 className="text-xl mt-10 mb-5">Results ({filteredData.length})</h1>
      {
        filteredData.length == 0 ?
        <div className="text-lg mb-5">No results</div>
        :
        filteredData.map(item =>
          <a key={item.title} className="block border border-[#323232] hover:border-[#484848] mb-5 rounded-lg bg-[#141414] p-4" href={item.link} target="_blank">
            <div className="text-2xl mb-3">{item.title}</div>
            <div className="mb-5">
              <div className="text-lg">{item.desc}</div>
              {
                item.contact_name ?
                <div className="text-sm mt-2 text-[#A6A6A6]"><a href={item.contact_url} target="_blank">Contact: {item.contact_name}</a></div>  
                :
                null
              }
            </div>
            <div className="flex flex-row flex-wrap">
            {
              Object.entries(item.tags).map(([key, value]) => (
                (value as string[]).map(function(tag: string) {
                  return <div key={tag} className={"mr-3 mb-2 text-base " + TAG_GROUP_TW_CLASS[key]}>{tag}</div>
                })
              ))
            }
            </div>
          </a>
        )
      }
    </div>
  )
}
