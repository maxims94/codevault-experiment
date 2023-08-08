
import { env } from "process"
import { TAG_GROUP_TW_CLASS, TAG_GROUP_KEYS } from "./tag-groups"

import { useEffect, useRef, useState } from "react"

import Image from 'next/image';

import closeIcon from '@/img/close.svg';

export default function RepoInput({ allTags, tagsFilter, setTagsFilter }:
  {
    allTags: { [index: string]: string[] },
    tagsFilter: { [index: string]: string[] },
    setTagsFilter: any
  }
) {

  const [showSearchWindow, setShowSearchWindow] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchWindowRef = useRef(null);
  const searchQueryInputRef = useRef(null);

  // when clicked outside, hide the search window
  const handleOutsideClick = (event: any) => {
    if (searchWindowRef.current && !(searchWindowRef.current as any).contains(event.target)) {
      setShowSearchWindow(false)
    }
  };

  // when enter or esc is pressed, hide the search window
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setShowSearchWindow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /*
  // sort data inplace by created-on date
  data.sort((a, b) => {
    return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
  })
  */

  const onSearchChange = (event: any) => {
    setSearchQuery(event.target.value)
  }
  const onSubmit = (event: any) => {
    event.preventDefault()
    setShowSearchWindow(false)
    if (searchQueryInputRef.current) {
      (searchQueryInputRef.current as any).blur()
    }
  }

  const filteredAllTags: { [index: string]: string[] } = {}

  for (const key in allTags) {
    const value = (allTags[key] as string[]).filter((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    if (value.length > 0) {
      filteredAllTags[key] = value
    }
  }

  const onTagClick = (group_id: string, tag: string) => {
    return (event: any) => {
      console.log(group_id, tag)
      setTagsFilter(
        {
          ...tagsFilter,
          [group_id]: tagsFilter[group_id].includes(tag) ? tagsFilter[group_id].filter(x => x !== tag) : [...tagsFilter[group_id], tag]
        }
      )
      console.log(tagsFilter)
    }
  }

  function onSearchWindowClick(event: any): void {
    // if event.target is not an "a" tag and not an "input" tag, then hide the search window
    if (event.target.tagName !== "A" && event.target.tagName !== "INPUT") {
      setShowSearchWindow(false)
    }
  }

  const resetTagsFilter = () => {
    const init: { [index: string]: string[] } = {}
    for (const key in TAG_GROUP_KEYS) {
      init[key] = []
    }
    setTagsFilter(init)
  }


  const removeTag = (key: string, tag: string) => {
    return (event: any) => {
      setTagsFilter(
        {
          ...tagsFilter,
          [key]: tagsFilter[key].filter(x => x !== tag)
        }
      )
    }
  }

  return (

    <div className="mb-5">
      <div className="relative">

        { /* for height */}
        <div className="border p-4 w-full invisible">
          <form>
            <input type="text" />
          </form>
        </div>

        {
          showSearchWindow ?
            <div
              className="absolute top-0 left-0 border border-[#797979] rounded-lg bg-[#141414] p-4 w-full"
              style={{ 'boxShadow': '0 0 15px 0 #222' }}
              ref={searchWindowRef}
              onClick={onSearchWindowClick}
            >
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  className="w-full bg-[#141414] focus:outline-none"
                  placeholder="Search..."
                  onFocus={() => setShowSearchWindow(true)}
                  // onBlur={() => setSearchFocus(false)}
                  onChange={onSearchChange}
                  ref={searchQueryInputRef}
                />
              </form>

              <div className="h-px bg-[#323232] mb-4 mt-4 w-full"></div>

              {
                Object.entries(filteredAllTags).some(([key, value]) => value.length > 0) ?
                
                Object.entries(filteredAllTags).map(([key, value]) => (

                  <div key={key} className="mb-6 last:mb-2">
                    <div className="text-base">Choose {TAG_GROUP_KEYS[key]}:</div>
                    <div className="flex flex-row flex-wrap">
                      {
                        (value as string[]).map(function (tag: string) {
                          return <a
                            key={tag}
                            className={"block mr-3 mt-3 text-base cursor-pointer " + TAG_GROUP_TW_CLASS[key] + " " + (tagsFilter[key].includes(tag) ? "" : "opacity-50")}
                            onClick={onTagClick(key, tag)}
                          >
                            {tag}
                          </a>
                        })
                      }
                    </div>
                  </div>
                ))
                :
                <div className="text-base">No tags found</div>
              }
            </div>
            :
            <div className="absolute top-0 left-0 border border border-[#484848] rounded-lg bg-[#141414] p-4 w-full" ref={searchWindowRef} onClick={() => searchQueryInputRef.current && (searchQueryInputRef.current as any).focus()}>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  className="w-full bg-[#141414] focus:outline-none"
                  placeholder="Search..."
                  onFocus={() => setShowSearchWindow(true)}
                  // onBlur={() => setSearchFocus(false)}
                  onChange={onSearchChange}
                  ref={searchQueryInputRef}
                />
              </form>
            </div>
        }
      </div>
      {
        // does tagsFilter have a non-empty array
        Object.entries(tagsFilter).some(([key, value]) => value.length > 0) ?

          // display tagsFilter as sequence of tags, with the right class
          <div className="flex flex-row mt-4 items-center">
            <div className="flex flex-row flex-grow flex-wrap mr-4">
              {
                Object.entries(tagsFilter).map(([key, value]) => (
                  (value as string[]).map(function (tag: string) {

                    return <
                      a
                      key={tag}
                      className={"flex flex-row justify-center mr-3 mb-2 text-base border border-[#333] hover:border-[#505050] py-2 px-5 rounded-full cursor-pointer"}
                      onClick={removeTag(key, tag)}
                    >
                      {tag}
                      <Image src={closeIcon} alt="close" width={10} className="inline-block ml-2" />
                    </a>
                  })
                ))
              }
            </div>
            <a className="text-sm cursor-pointer hover:underline" onClick={resetTagsFilter}>
              Clear
            </a>
          </div>
          :
          null
      }
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

            {
                Object.entries(filteredAllTags).map(([key, value]) => (
                
                  <div key={key} className="mb-6 last:mb-2">
                    <div className="text-base">Choose {TAG_GROUP_KEYS[key]}:</div>
                    <div className="flex flex-row flex-wrap">
                      {
                        (value as string[]).map(function (tag: string) {
                          return <a
                            key={tag}
                            className={"block mr-3 mt-3 text-base cursor-pointer " + TAG_GROUP_TW_CLASS[key] + " " + (tagsFilter[key].includes(tag) ? "" : "opacity-50")}
                            onClick={onTagClick(key, tag)}
                          >
                            {tag}
                          </a>
                        })
                      }
                    </div>
                  </div>
                ))
                    }
*/
