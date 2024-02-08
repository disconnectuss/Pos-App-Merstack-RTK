import React, { useState } from 'react'
import Header from '../components/Header'
import {Button, Table, Card} from "antd"
import InvoiceModal from '../components/InvoiceModal'



const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
   
    
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
  return (
    <>
      <Header/>
      <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-70 pr-2">
            <div className="flex justify-between">
                <span>Total</span>
                <span>100 ₺</span>
            </div>
            <div className="flex justify-between my-2">
                <span>Each 5%</span>
                <span className='text-red-700'>20 ₺</span>
            </div>
            <div className="flex justify-between">
                <span>All</span>
                <span>120 ₺</span>
            </div>
            <Button onClick={()=>{setIsModalOpen(true)}}
            className="cartAdd mt-4 w-full text-white"  size="large">Add to Order</Button>
      </Card>
      </div>
      <InvoiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  )
}

export default CartPage
