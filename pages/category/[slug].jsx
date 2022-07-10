import React from 'react'
import { useRouter } from 'next/router'

function Category() {
    const router = useRouter()
    const { slug } = router.query
  return (
    <div>{slug}</div>
  )
}

export default Category