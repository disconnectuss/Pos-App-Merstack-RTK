import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Button } from "antd";
import AddTables from "../components/tables/AddTables";
import TableCard from "../components/tables/TableCard";
import EditTables from "../components/tables/EditTables";

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // console.log(isAddModalOpen);
  // console.log(tables);
  useEffect(() => {
    const getTables = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tables/get-all");
        const data = await res.json();
        setTables(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTables();
  }, [isAddModalOpen]);

  return (
    <div>
      <Header />
      <h1 className="text-4xl p-5 font-bold">Table View</h1>
      <div className="flex justify-end mr-5 gap-5">
        <Button>1st Floor</Button>
        <Button>2nd Floor</Button>
        <Button>Garden</Button>
      </div>
      <div className="tables-wrapper border grid grid-cols-card gap-4 p-5">
        {tables?.map((item) => (
          <TableCard item={item} key={item._id} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        ))}
      </div>

      <div className="flex justify-between p-5">
        <div className="status flex flex-col p-5">
          <span className="text-green-500 mb-2"> Available : {""} </span>
          <span className="text-red-500 mb-2">Dine In : {""} </span>
          <span className="text-blue-500 mb-2"> Reserved : {""} </span>
        </div>
        <Button
          type="text"
          onClick={() => setIsAddModalOpen(true)}
          className="!bg-red-300 text-white hover:shadow-lg cursor-pointer transition-all select-none"
        >
          Add Table
        </Button>
      </div>
      {isAddModalOpen && (
        <AddTables
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          tables={tables}
          setTables={setTables}
        />
      )}
      <EditTables
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          tables={tables}
          setTables={setTables}
        />
    </div>
  );
};

export default TablePage;
