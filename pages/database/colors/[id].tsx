import Button from '@components/buttons'
import MyCombobox from '@components/combobox'
import PrimaryLayout from '@components/layouts/primary'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'
import { useDeferredValue } from 'react'

const ColorPage: NextPageWithLayout = () => {
  const { data: color, mutate } = useFetchData(`/api/data/unique/colors`, { findUnique: true })
  const { data: surfaces } = useFetchData('/api/data/many/surfaces')

  // whitelist combobox results - current & existing companies excluded
  const filteredSurfaces = useDeferredValue(
    surfaces?.filter((ar: any) => !color?.surfaces?.find((rm: any) => rm.surface === ar.surface))
  )

  const addSurface = async (event: any) => {
    event.preventDefault()

    const input = event?.target?.['surface']?.value
    const method = 'PATCH'

    const body = {
      data: {
        color: color?.color,
        surface: input,
      },
      table: 'colors',
    }

    const res = await fetch(`/api/colors`, {
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

  const deleteSurface = async (event: any, id: string) => {
    const body = {
      data: {
        color: color?.color,
        surface: id,
      },
      table: 'colors',
    }

    const res = await fetch(`/api/colors`, {
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

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Color:</span>
        {color?.color}
      </p>
      <p className="">
        <span className="font-bold mr-2">Description:</span>
        {color?.description}
      </p>
      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(color?.createdAt).toLocaleDateString()}
      </p>

      <div className="border-t mt-6 pt-6">
        <form onSubmit={addSurface} className="flex gap-2 items-center justify-start">
          <MyCombobox array={filteredSurfaces} name={'surface'} label={'Surface'} required={true} options="surface" />
          <Button>Connect to Surface</Button>
        </form>
        <div className="mt-6 border-t pt-6 pb-3">
          <p className="font-bold">Surfaces:</p>
        </div>
        {color?.surfaces?.map((el: any) => (
          <div key={el.id} className="flex gap-2 pb-2 items-center justify-start">
            <Button onClick={(event: any) => deleteSurface(event, el.id)}>Remove</Button>
            <p>{el.surface}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ColorPage

ColorPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Color">{page}</PrimaryLayout>
}
