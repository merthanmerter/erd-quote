import fetcher from '@lib/fetcher'
import { useRouter } from 'next/router'
import { useDeferredValue } from 'react'
import useSWR from 'swr'

export default function useFetchData(apiRoute: string, findUnique?: { findUnique?: boolean }) {
  const { query } = useRouter()

  const { data, isValidating, error, mutate } = useSWR(findUnique ? apiRoute + `/${query.id}` : apiRoute, fetcher)

  const deferredData = useDeferredValue(data)

  return {
    data: deferredData,
    mutate: mutate,
  }
}
