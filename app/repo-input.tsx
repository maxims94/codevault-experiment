
import { TAG_GROUP_TW_CLASS } from "./tag-groups"

import { useState } from "react"

export default function RepoInput({ allTags, setTagsFilter }: any) {
  
  const [searchFocus, setSearchFocus] = useState(false)
  
  /*
  // sort data inplace by created-on date
  data.sort((a, b) => {
    return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
  })
  */
  
  const onSubmit = (event: any) => {
  }
  
  return (
  
    <div className="mb-5">
      <div className="relative">
        {
          searchFocus ?
          <>
            <form className="border border-b-0 border-[#797979] rounded-t-lg bg-[#141414] p-4 w-full" onSubmit={onSubmit} style={{ 'boxShadow' : '0 0 15px 0 #222'}}>
              <input type="text" className="w-full bg-[#141414] focus:outline-none" placeholder="Search..." onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}/>
            </form>
            <div className="absolute border border border-[#797979] border-t-0 rounded-b-lg bg-[#141414] p-4 w-full" style={{ 'boxShadow' : '0 0 15px 0 #222'}}>
              {
                Object.entries(allTags).map(([key, value]) => (
                  <div key={key} className="mb-3">
                    <div className="text-lg mb-2">{key}</div>
                    <div className="flex flex-row flex-wrap">
                    {
                      (value as string[]).map(function(tag: string) {
                        return <div key={tag} className={"mr-3 mb-2 text-base " + TAG_GROUP_TW_CLASS[key]}>{tag}</div>
                      })
                    }
                    </div>
                  </div>
                ))
              }
            </div>
          </>
          :
          <form className="border border-[#323232] rounded-lg bg-[#141414] p-4 w-full" onSubmit={onSubmit}>
            <input type="text" className="w-full bg-[#141414] focus:outline-none" placeholder="Search..." onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}/>
          </form>
        }
      </div>
    </div>
  )
}


      /*
      <h1 className="text-xl mb-5">Results ({data.length})</h1>
      {
        data.length == 0 ?
        <div className="text-lg mb-5">No results found</div>
        :
        data.map(item =>
          <a key={item.title} className="block border border-[#323232] mb-5 rounded-lg bg-[#141414] p-4" href={item.link} target="_blank">
            <div className="text-xl mb-3">{item.title}</div>
            <div className="text-lg mb-8">{item.desc}</div>
            <div className="flex flex-row flex-wrap">
            {
              Object.entries(item.tags).map(([key, value]) => (
                (value as string[]).map(function(tag: string) {
                  return <div key={tag} className={"mr-3 mb-2 text-lg " + TAG_GROUP_TW_CLASS[key]}>{tag}</div>
                })
              ))
            }
            </div>
          </a>
        )
      }


              <div className="h-px bg-[#323232] my-3 w-full"></div>
      */