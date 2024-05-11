import React from 'react'
import { EditOutlined } from "@ant-design/icons";



function TableCard() {
  return (
    <div className="table-card border hover:shadow-lg cursor-pointer transition-all select-none">
    <div className="table-name border rounded-full w-10 flex justify-center p-2 m-4">
      <span className="text-center">A1</span>
    </div>
    <div className="product-stat flex flex-col p-3">
      <span className="font-bold">Available</span>
      <span className="people">People: 4 </span>
    </div>
    <div className="flex justify-end p-2 w-full hover:shadow-lg cursor-pointer transition-all select-none">
      <EditOutlined className="text-lg" />
    </div>
  </div>
  )
}

export default TableCard
