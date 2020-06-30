import { useRouter } from 'next/router'

import Stack from "../../components/common/stack"
import Inline from "../../components/common/inline"

import api from "../../utils/api"
import * as size from '../../utils/size'

export async function getServerSideProps({ params: { slug } }) {
  console.log("slug: ", slug)
  const data = await api.getSummary()
  return { props: { data, slug } }
}

export default function Country({ slug }) {
  return (
    <>
      <div className="text-primary">Country page {slug}</div>
    </>
  )
}

