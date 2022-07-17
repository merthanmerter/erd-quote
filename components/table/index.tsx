import React from 'react'

type Props = {
  columns: { id: number; title: string }[]
  rows: any
}

const Table: React.FC<Props> = (props) => {
  return (
    <div className="overflow-x-auto mt-4 border rounded-md">
      <table className="text-left w-full whitespace-nowrap">
        <thead>
          <tr>
            {props.columns.map((el: any) => (
              <th key={el.id} className="p-2">
                {el.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.rows}</tbody>
      </table>
    </div>
  )
}

export default Table
