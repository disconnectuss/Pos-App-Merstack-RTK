import React, { useState } from "react";
import { EditOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { getTableStatusConfig, formatNumber } from "../../utils/formatters";

function TableCard({ item }) {
  const statusConfig = getTableStatusConfig(item.status);
  
  const getPeopleIcon = () => {
    if (item.people <= 2) return "👥";
    if (item.people <= 4) return "👨‍👩‍👧‍👦";
    if (item.people <= 6) return "👥👥";
    return "👥👥👥";
  };

  return (
    <div
      className={`table-card border-2 ${statusConfig.textColor} hover:shadow-xl cursor-pointer transition-all duration-300 select-none ${statusConfig.color} ${statusConfig.hoverColor} rounded-lg overflow-hidden transform hover:scale-105`}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-white/20">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.badge}`}>
            {statusConfig.icon} {statusConfig.label}
          </span>
        </div>
        <p className="text-sm opacity-90 mt-1">Table #{item.number}</p>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserOutlined className="text-lg" />
            <span className="font-medium">Capacity:</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-lg">{getPeopleIcon()}</span>
            <span className="font-bold text-lg">{formatNumber(item.people)}</span>
          </div>
        </div>

        {/* Status specific additional info */}
        {item.status.toLowerCase() === 'occupied' && (
          <div className="bg-white/10 rounded p-2 text-sm">
            <ClockCircleOutlined className="mr-1" />
            <span>In use since 2:30 PM</span>
          </div>
        )}
        
        {item.status.toLowerCase() === 'reserved' && (
          <div className="bg-white/10 rounded p-2 text-sm">
            <ClockCircleOutlined className="mr-1" />
            <span>Reserved for 6:00 PM</span>
          </div>
        )}
      </div>

      {/* Footer with action button */}
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2"
          onClick={(e) => {
            e.stopPropagation();
            // Handle table action based on status
            console.log(`Action for table ${item.number}`);
          }}
        >
          <EditOutlined />
          <span>
            {item.status.toLowerCase() === 'available' ? 'Reserve' :
             item.status.toLowerCase() === 'occupied' ? 'Check Out' :
             item.status.toLowerCase() === 'reserved' ? 'Check In' : 'Manage'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default TableCard;
