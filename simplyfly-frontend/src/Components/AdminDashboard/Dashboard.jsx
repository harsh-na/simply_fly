import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {
  // Sample data for users, flight owners, tickets, and flight routes
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const [flightOwners, setFlightOwners] = useState([
    { id: 1, name: 'Skyline Air', email: 'contact@skylineair.com' },
    { id: 2, name: 'BlueJet', email: 'support@bluejet.com' },
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, user: 'John Doe', flight: 'Flight 101', date: '2024-12-10' },
    { id: 2, user: 'Jane Smith', flight: 'Flight 202', date: '2024-12-12' },
  ]);

  const [flightRoutes, setFlightRoutes] = useState([
    { id: 1, route: 'New York - Los Angeles', flightNumber: 'NY101' },
    { id: 2, route: 'Chicago - Miami', flightNumber: 'CM202' },
  ]);

  // Dialog control
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  // Handle delete actions
  const handleDelete = () => {
    if (deleteType === 'user') {
      setUsers(users.filter((user) => user.id !== deleteTarget.id));
    } else if (deleteType === 'flightOwner') {
      setFlightOwners(flightOwners.filter((owner) => owner.id !== deleteTarget.id));
    } else if (deleteType === 'ticket') {
      setTickets(tickets.filter((ticket) => ticket.id !== deleteTarget.id));
    } else if (deleteType === 'flightRoute') {
      setFlightRoutes(flightRoutes.filter((route) => route.id !== deleteTarget.id));
    }
    setOpenDialog(false);
  };

  const openDeleteDialog = (type, target) => {
    setDeleteType(type);
    setDeleteTarget(target);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Administrators Dashboard
      </Typography>

      {/* Manage User Accounts */}
      <Typography variant="h6" gutterBottom>
        User Accounts
      </Typography>
      <DataGrid
        rows={users}
        columns={[
          { field: 'name', headerName: 'Name', flex: 1 },
          { field: 'email', headerName: 'Email', flex: 1 },
          {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
              <Button
                color="error"
                onClick={() => openDeleteDialog('user', params.row)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        autoHeight
        disableSelectionOnClick
      />

      {/* Manage Flight Owner Accounts */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Flight Owner Accounts
      </Typography>
      <DataGrid
        rows={flightOwners}
        columns={[
          { field: 'name', headerName: 'Name', flex: 1 },
          { field: 'email', headerName: 'Email', flex: 1 },
          {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
              <Button
                color="error"
                onClick={() => openDeleteDialog('flightOwner', params.row)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        autoHeight
        disableSelectionOnClick
      />

      {/* Manage Booked Tickets */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Booked Tickets
      </Typography>
      <DataGrid
        rows={tickets}
        columns={[
          { field: 'user', headerName: 'User', flex: 1 },
          { field: 'flight', headerName: 'Flight', flex: 1 },
          { field: 'date', headerName: 'Date', flex: 1 },
          {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
              <Button
                color="error"
                onClick={() => openDeleteDialog('ticket', params.row)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        autoHeight
        disableSelectionOnClick
      />

      {/* Manage Flight Routes */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Flight Routes
      </Typography>
      <DataGrid
        rows={flightRoutes}
        columns={[
          { field: 'route', headerName: 'Route', flex: 1 },
          { field: 'flightNumber', headerName: 'Flight Number', flex: 1 },
          {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
              <Button
                color="error"
                onClick={() => openDeleteDialog('flightRoute', params.row)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        autoHeight
        disableSelectionOnClick
      />

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {deleteType}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;