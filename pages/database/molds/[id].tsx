import Button from '@components/buttons'
import MyCombobox from '@components/combobox'
import PrimaryLayout from '@components/layouts/primary'
import Loading from '@components/loading'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'
import { useDeferredValue } from 'react'

const MoldPage: NextPageWithLayout = () => {
  const { data: mold, mutate } = useFetchData(`/api/data/unique/molds`, { findUnique: true })
  const { data: companies } = useFetchData('/api/data/many/companies')

  // whitelist combobox results - current & existing companies excluded
  const whitelist = useDeferredValue(
    companies
      ?.filter((ar: any) => !mold?.whitelist?.companies.find((rm: any) => rm.name === ar.name))
      ?.filter((el: any) => el.name != mold?.companiesId)
  )

  const addToWhitelist = async (event: any) => {
    event.preventDefault()

    const input = event?.target?.['whitelist']?.value
    const method = mold?.whitelist?.id?.length > 0 ? 'PATCH' : 'POST'

    const body = {
      data: {
        moldNo: mold?.moldNo,
        company: input,
      },
      table: 'whitelist',
    }

    const res = await fetch(`/api/whitelist`, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status < 300) {
      mutate()
    }
  }

  const deleteFromWhitelist = async (event: any, id: string) => {
    const body = {
      data: {
        moldNo: mold?.moldNo,
        company: id,
      },
      table: 'whitelist',
    }

    const res = await fetch(`/api/whitelist`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status < 300) {
      mutate()
    }
  }

  if (!mold) return <Loading />

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Mold No:</span>
        {mold?.moldNo}
      </p>
      <p className="">
        <span className="font-bold mr-2">kg/m:</span>
        {mold?.kgm}
      </p>
      <p className="">
        <span className="font-bold mr-2">Perimeter (mm):</span>
        {mold?.perimeter}
      </p>
      <p className="">
        <span className="font-bold mr-2">Company:</span>
        {mold?.companiesId}
      </p>
      <p className="">
        <span className="font-bold mr-2">Mold Type:</span>
        {mold?.moldType}
      </p>
      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(mold?.createdAt).toLocaleDateString()}
      </p>

      <div className="border-t mt-6 pt-6">
        <form onSubmit={addToWhitelist} className="flex gap-2 items-center justify-start">
          <MyCombobox array={whitelist} name={'whitelist'} label={'Company'} required={true} options="name" />
          <Button>Add to Whitelist</Button>
        </form>
        <div className="mt-6 border-t pt-6 pb-3">
          <p className="font-bold">Whitelist:</p>
        </div>
        {mold?.whitelist?.companies?.map((el: any) => (
          <div key={el.id} className="flex gap-2 pb-2 items-center justify-start">
            <Button onClick={(event: any) => deleteFromWhitelist(event, el.id)}>Remove</Button>
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoldPage

MoldPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Mold">{page}</PrimaryLayout>
}
