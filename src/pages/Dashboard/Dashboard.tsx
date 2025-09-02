import React, { useState, useEffect } from "react";
import api from "../../api";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from "recharts";
import "./Dashboard.css";
import { TableOrders } from "../Menu/Menu";

interface PieChartData { name: string; value: number; color: string; }
interface BarChartData { name: string; value: number; }
interface LineChartData { name: string; value: number; }

const transformDataForPieChart = (tableOrders: TableOrders[]): PieChartData[] => {
  const groupedOrders: { [key: string]: number } = {};
  const colors = [
    '#FFC0CB', '#90EE90', '#ADD8E6', '#F08080', '#20B2AA', 
    '#FFA07A', '#EE82EE', '#7FFFD4', '#C0C0C0', '#FFE4B5'
  ];

  tableOrders.forEach(tableOrder => {
    tableOrder.orders.forEach(order => {
      // Use nullish coalescing for safety
      groupedOrders[order.name] = (groupedOrders[order.name] || 0) + (order?.quantity ?? 0);
    });
  });

  return Object.keys(groupedOrders).map((name, index) => ({
    name,
    value: groupedOrders[name],
    color: colors[index % colors.length],
  }));
};

const transformDataForBarChart = (tableOrders: TableOrders[]): BarChartData[] => {
  const productQuantities: { [key: string]: number } = {};

  tableOrders.forEach(tableOrder => {
    tableOrder.orders.forEach(order => {
      productQuantities[order.name] = (productQuantities[order.name] || 0) + (order?.quantity ?? 0);
    });
  });

  const sortedData = Object.keys(productQuantities)
    .sort((a, b) => productQuantities[b] - productQuantities[a])
    .map(name => ({
      name,
      value: productQuantities[name],
    }));

  return sortedData;
};

const transformDataForLineChart = (tableOrders: TableOrders[]): LineChartData[] => {
  const dailyTotals: { [key: string]: number } = {};
  debugger;
  tableOrders.forEach(tableOrder => {
    if (tableOrder.isPaid) {
      const date = tableOrder.orderTime;
      dailyTotals[date] = (dailyTotals[date] || 0) + tableOrder.total;
    }
  });

  const transformedData = Object.keys(dailyTotals).map(date => ({
    name: date,
    value: dailyTotals[date],
  }));

  return transformedData;
};

const Dashboard = () => {
  // Correctly type your state variables
  const [data, setData] = useState<TableOrders[]>([]); 
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [lineChartData, setLineChartData] = useState<LineChartData[]>([]);

  useEffect(() => {
    api
      .get<TableOrders[]>("/table_orders") // Correctly type the API response
      .then((response) => {
        const rawData = response.data;
        setData(rawData);
        setPieChartData(transformDataForPieChart(rawData));
        setBarChartData(transformDataForBarChart(rawData));
        setLineChartData(transformDataForLineChart(rawData));
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h2>Ürün Satış Dağılımı</h2>
        {pieChartData.length > 0 && (
          <PieChart width={350} height={350}>
            <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>

      <div className="dashboard-card">
        <h2>En Çok Satan Ürünler</h2>
        {barChartData.length > 0 && (
          <BarChart width={350} height={350} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
      </div>

      <div className="dashboard-card">
        <h2>Günlük Satış Geliri</h2>
        {lineChartData.length > 0 && (
          <LineChart width={350} height={350} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        )}
      </div>
      
      <div className="dashboard-card">
          <h2>...Dördüncü Grafik Alanı...</h2>
          {/* Buraya son grafiği ekleyebilirsiniz */}
      </div>
    </div>
  );
};

export default Dashboard;