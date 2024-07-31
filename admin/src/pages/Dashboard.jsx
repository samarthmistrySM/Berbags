import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { FaUsers, FaShoppingCart, FaProjectDiagram, FaDollarSign } from 'react-icons/fa';

const data = [
  { name: 'Jan', users: 4000, orders: 2400, revenues: 2400 },
  { name: 'Feb', users: 3000, orders: 1398, revenues: 2210 },
  { name: 'Mar', users: 2000, orders: 9800, revenues: 2290 },
  { name: 'Apr', users: 2780, orders: 3908, revenues: 2000 },
  { name: 'May', users: 1890, orders: 4800, revenues: 2181 },
  { name: 'Jun', users: 2390, orders: 3800, revenues: 2500 },
  { name: 'Jul', users: 3490, orders: 4300, revenues: 2100 },
];

const pieData = [
  { name: 'Project A', value: 400 },
  { name: 'Project B', value: 300 },
  { name: 'Project C', value: 300 },
  { name: 'Project D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const Dashboard = () => {
  document.title = "Admin | Dahboard"
  return (
    <Box className="w-full p-4">
      <Typography variant="h4" gutterBottom className="w-full mb-4">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-blue-500 text-white">
            <FaUsers className="text-3xl mb-2" />
            <Typography variant="h5">Users</Typography>
            <Typography variant="h4">4,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-green-500 text-white">
            <FaShoppingCart className="text-3xl mb-2" />
            <Typography variant="h5">Orders</Typography>
            <Typography variant="h4">2,400</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-yellow-500 text-white">
            <FaProjectDiagram className="text-3xl mb-2" />
            <Typography variant="h5">Projects</Typography>
            <Typography variant="h4">1,200</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="p-4 bg-red-500 text-white">
            <FaDollarSign className="text-3xl mb-2" />
            <Typography variant="h5">Revenue</Typography>
            <Typography variant="h4">$24,000</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box className="flex flex-wrap -m-2 w-full mt-4">
        <Paper className="flex-1 p-4 m-2" style={{ flexBasis: 'calc(50% - 16px)', minWidth: 300 }}>
          <Typography variant="h6">Users Over Time</Typography>
          <LineChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </Paper>
        <Paper className="flex-1 p-4 m-2" style={{ flexBasis: 'calc(50% - 16px)', minWidth: 300 }}>
          <Typography variant="h6">Orders Over Time</Typography>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#8884d8" />
            <Bar dataKey="revenues" fill="#82ca9d" />
          </BarChart>
        </Paper>
        <Paper className="flex-1 p-4 m-2" style={{ flexBasis: 'calc(50% - 16px)', minWidth: 300 }}>
          <Typography variant="h6">Project Distribution</Typography>
          <PieChart width={300} height={200}>
            <Pie
              data={pieData}
              cx={150}
              cy={100}
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Paper>
        <Paper className="flex-1 p-4 m-2" style={{ flexBasis: 'calc(50% - 16px)', minWidth: 300 }}>
          <Typography variant="h6">Revenue Over Time</Typography>
          <LineChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenues" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
