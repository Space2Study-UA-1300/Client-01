import { useState, useMemo, useLayoutEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { ServiceFunction, ItemsWithCount } from '~/types'

interface UseLoadMoreProps<Data, Params> {
  service: ServiceFunction<ItemsWithCount<Data>, Params>
  limit: number
  params?: Params
}

const useLoadMore = <Data, Params>({
  service,
  limit: defaultLimit,
  params
}: UseLoadMoreProps<Data, Params>) => {
  const [searchParams] = useSearchParams()

  const initialLimit = Number(searchParams.get('limit')) || defaultLimit

  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<Data[]>([])
  const [previousLimit, setPreviousLimit] = useState<number>(initialLimit)

  let isFetched = false

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + initialLimit),
    [initialLimit]
  )

  const handleResponse = useCallback((responseData: ItemsWithCount<Data>) => {
    setData((prevState) => [...prevState, ...responseData.items])
  }, [])

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Data>,
    Params
  >({
    service,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false,
    onResponse: handleResponse
  })

  useLayoutEffect(() => {
    if (previousLimit === initialLimit && !isFetched) {
      void fetchData({ ...params, limit: initialLimit, skip } as Params)
    } else {
      resetData()
      setPreviousLimit(initialLimit)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isFetched = true
    }
  }, [fetchData, initialLimit, previousLimit, resetData, skip, params])

  const isExpandable = useMemo(
    () => data.length < response.count && data.length > 0,
    [data, response]
  )

  return {
    data,
    loading,
    resetData,
    loadMore,
    isExpandable
  }
}

export default useLoadMore
