import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { Button, Spin, Badge, Select, Input, Card, Statistic, Row, Col } from "antd";
import AddTables from "../components/tables/AddTables";
import TableCard from "../components/tables/TableCard";
import EditTables from "../components/tables/EditTables";
import { EditOutlined, PlusOutlined, SearchOutlined, FilterOutlined, UserOutlined } from "@ant-design/icons";
import { getTableStatusConfig, formatNumber } from "../utils/formatters";
import getApiUrl from "../utils/apiUtils";

const { Option } = Select;
const { Search } = Input;

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Apply filters
  useEffect(() => {
    let result = tables;

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((table) => table.status.toLowerCase() === statusFilter);
    }

    // Capacity filter
    if (capacityFilter !== "all") {
      if (capacityFilter === "small") {
        result = result.filter((table) => table.people <= 2);
      } else if (capacityFilter === "medium") {
        result = result.filter((table) => table.people >= 3 && table.people <= 6);
      } else if (capacityFilter === "large") {
        result = result.filter((table) => table.people > 6);
      }
    }

    // Search filter
    if (searchTerm) {
      result = result.filter((table) => 
        table.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(result);
  }, [tables, statusFilter, capacityFilter, searchTerm]);
  // console.log(isAddModalOpen);
  // console.log(tables);
  useEffect(() => {
    const getTables = async () => {
      try {
        const res = await fetch(getApiUrl("/tables/get-all"));
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
  const getStatusCount = (status) => {
    return tables.filter((table) => table.status.toLowerCase() === status).length;
  };

  const getTotalCapacity = () => {
    return tables.reduce((sum, table) => sum + table.people, 0);
  };

  const getAvailableCapacity = () => {
    return tables
      .filter((table) => table.status.toLowerCase() === 'available')
      .reduce((sum, table) => sum + table.people, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Table Management</h1>
          <div className="flex gap-3">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
              className="!bg-orange-500 hover:!bg-orange-600"
            >
              Add Table
            </Button>
            <Button
              icon={<EditOutlined />}
              onClick={() => setIsEditModalOpen(true)}
              className="!bg-purple-500 !text-white hover:!bg-purple-600"
            >
              Edit Tables
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Tables"
                value={tables.length}
                valueStyle={{ color: '#1890ff' }}
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Available"
                value={getStatusCount('available')}
                valueStyle={{ color: '#52c41a' }}
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Occupied"
                value={getStatusCount('occupied')}
                valueStyle={{ color: '#f5222d' }}
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Capacity"
                value={getTotalCapacity()}
                valueStyle={{ color: '#722ed1' }}
                prefix={<UserOutlined />}
                formatter={(value) => formatNumber(value)}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters Section */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <FilterOutlined />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Search
              placeholder="Search tables by name or number..."
              allowClear
              style={{ width: 250 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />

            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              placeholder="Filter by status"
            >
              <Option value="all">All Status</Option>
              <Option value="available">
                <Badge color="green" text="Available" />
              </Option>
              <Option value="occupied">
                <Badge color="red" text="Occupied" />
              </Option>
              <Option value="reserved">
                <Badge color="blue" text="Reserved" />
              </Option>
            </Select>

            <Select
              value={capacityFilter}
              onChange={setCapacityFilter}
              style={{ width: 150 }}
              placeholder="Filter by capacity"
            >
              <Option value="all">All Sizes</Option>
              <Option value="small">Small (1-2)</Option>
              <Option value="medium">Medium (3-6)</Option>
              <Option value="large">Large (7+)</Option>
            </Select>

            <Button 
              onClick={() => {
                setStatusFilter("all");
                setCapacityFilter("all");
                setSearchTerm("");
              }}
              type="text"
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filtered.length} of {tables.length} tables
            {searchTerm && ` matching "${searchTerm}"`}
            {statusFilter !== "all" && ` with status "${statusFilter}"`}
            {capacityFilter !== "all" && ` (${capacityFilter} size)`}
          </p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!filtered || filtered.length === 0 ? (
            tables.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Spin size="large" />
                <p className="mt-4 text-gray-500">Loading tables...</p>
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 text-lg">No tables match your current filters</p>
                <Button 
                  type="link"
                  onClick={() => {
                    setStatusFilter("all");
                    setCapacityFilter("all");
                    setSearchTerm("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )
          ) : (
            filtered.map((item) => (
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
        </div>
      </div>

      {/* Modals */}
      <AddTables
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        tables={tables}
        setTables={setTables}
      />
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
