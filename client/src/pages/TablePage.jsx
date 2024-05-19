import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Button, Spin } from "antd";
import AddTables from "../components/tables/AddTables";
import TableCard from "../components/tables/TableCard";
import EditTables from "../components/tables/EditTables";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [tableTitle, setTableTitle] = useState("All");

  useEffect(() => {
    if (tableTitle === "All") {
      setFiltered(tables);
    } else {
      setFiltered(tables.filter((item) => item.title === tableTitle));
    }
  }, [tables, tableTitle]);
  // console.log(isAddModalOpen);
  // console.log(tables);
  useEffect(() => {
    const getTables = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL+ "/api/tables/get-all");
        const data = await res.json();
        setTables(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTables();
  }, [isAddModalOpen]);

  // Function to count statuses
  const countStatuses = (status) => {
    return tables.filter((table) => table.status === status).length;
  };
  return (
    <div>
      <Header />
      <h1 className="text-4xl p-5 font-bold">Table View</h1>
      <div className="flex justify-end mr-5 gap-5 mb-3">
        <Button
          onClick={() => setTableTitle("All")}
          className="!bg-gray-500 text-white"
        >
          Show All
        </Button>
        <Button
          onClick={() => setTableTitle("A")}
          className="!bg-gray-500 text-white"
        >
          BLOCK/A
        </Button>
        <Button
          onClick={() => setTableTitle("B")}
          className="!bg-gray-500 text-white"
        >
          BLOCK/B
        </Button>
        <Button
          onClick={() => setTableTitle("C")}
          className="!bg-gray-500 text-white"
        >
          BLOCK/C
        </Button>
      </div>
      <div className="tables-wrapper grid grid-cols-card gap-4">
        {!filtered || filtered.length === 0 ? (
          <Spin
            size="large"
            className="absolute top-2/3 h-screen w-screen flex justify-center"
          />
        ) : (
          filtered?.map((item) => (
            <TableCard
              item={item}
              key={item._id}
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          ))
        )}
        <div className="table-card border text-white flex justify-center items-center hover:shadow-lg cursor-pointer transition-all select-none bg-purple-500">
          <EditOutlined
            className="md:text-4xl text-white hover:opacity-80"
            onClick={() => setIsEditModalOpen(true)}
          />
        </div>
        <div className="table-card border text-white flex justify-center items-center hover:shadow-lg cursor-pointer transition-all select-none bg-orange-500">
          <PlusOutlined
            className="md:text-4xl text-white hover:opacity-80"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
      </div>

      <div className="flex justify-between p-5">
        <div className="status flex flex-col p-5">
          <span className="text-green-500 mb-2">
            Available: {countStatuses("Available")}
          </span>
          <span className="text-red-500 mb-2">
            Dine In: {countStatuses("Dine in")}
          </span>
          <span className="text-blue-500 mb-2">
            Reserved: {countStatuses("Reserved")}
          </span>
        </div>
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
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        tables={tables}
        setTables={setTables}
      />
    </div>
  );
};

export default TablePage;
