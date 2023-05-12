import React from 'react'

async function getData(param:string) {
  const res = await fetch(`https://api.github.com/users/${param}`)
  return res.json()
}

const page = async ({params}: {params:{slug:string}}) => {
  const data = await getData(params.slug)
  return (
    <div>
      Detail user: {params.slug}
      {JSON.stringify(data)}
    </div>
  )
}

export default page