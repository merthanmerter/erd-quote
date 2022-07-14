import { useRouter } from 'next/router'
import { useCallback } from 'react'

export default function useRouterRefresh() {
  const { asPath, replace, reload } = useRouter()

  return useCallback(() => replace(asPath), [asPath])
}
