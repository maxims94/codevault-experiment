import RepoSearch from './repo-search';

import Airtable from 'airtable';

import { TAG_GROUP_KEYS } from './tag-groups';

export const revalidate = 0;

export default async function Main() {
  
  console.log("Load Airtable data")
  
  if(
    !process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN ||
    !process.env.AIRTABLE_BASE_ID ||
    !process.env.AIRTABLE_TABLE_ID
  ) 
    throw new Error("Missing Airtable credentials")

  const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN as string}).base(process.env.AIRTABLE_BASE_ID as string);
  const table = base(process.env.AIRTABLE_TABLE_ID as string)
  
  let result;

  try {
    result = await table.select().all()
  } catch(error: any) {
    console.error("Couldn't retrieve Airtable data:", error)
    throw new Error(error)
  }

  console.log("Number of records: ", result.length)
  
  const data: any[] = []
  
  const allTags: { [index: string]: Set<string>} = {}

  for(const key in TAG_GROUP_KEYS) {
    allTags[key] = new Set<string>()
  }

  for(const record of result) {
    
    if(!record.get('Approved')) {
      continue
    }
    
    const obj = {
      title: record.get('Title'),
      desc: record.get('Description'),
      link: record.get('Link'),
      tags: {} as { [index: string]: string[] },
      created_on: record.get('Created On'),
      contact_name: record.get('Contact Name'),
      contact_url: record.get('Contact URL')
    }

    for(const key in TAG_GROUP_KEYS) {

      //console.log(record.get(TAG_GROUP_KEYS[key]))

      const value = (record.get(TAG_GROUP_KEYS[key]) ?? []) as string[]
      
      obj.tags[key] = value

      value.forEach(tag => allTags[key].add(tag))
    }
    
    data.push(obj)
  }

  //console.log(data)

  return (
    <>
      <RepoSearch data={data} allTags={allTags}/>
    </>
  )
}
