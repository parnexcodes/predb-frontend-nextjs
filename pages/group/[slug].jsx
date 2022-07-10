import React from 'react'
import { useRouter } from 'next/router'

function Group() {
    const router = useRouter()
    const { slug } = router.query
  return (
    <div>{slug}</div>
  )
}

export default Group