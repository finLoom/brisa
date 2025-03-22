// frontend/src/shared/components/data/agGrid/DataGridPage.tsx
import React, { useState, useMemo } from 'react';
import {
  FluentProvider,
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  webLightTheme
} from '@fluentui/react-components';
import { AgGridReact } from 'ag-grid-react';
import {
  ModuleRegistry,
  ColDef,
  GridOptions,
  GridReadyEvent,
  // Core Modules
  ClientSideRowModelModule,
  PaginationModule,
  // Filter Modules
  TextFilterModule,
  NumberFilterModule,
  // Column Modules
  ColumnAutoSizeModule,
  // Selection Module
  RowSelectionModule
} from 'ag-grid-community';

// Import only the CSS for the theme
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register necessary AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ColumnAutoSizeModule,
  RowSelectionModule
]);

// Custom cell renderer for status
const StatusCellRenderer = (params: any) => {
  const status = params.value;
  const getStatusColor = () => {
    switch(status) {
      case 'Active': return '#10B981'; // Tailwind green-500
      case 'Pending': return '#F59E0B'; // Tailwind yellow-500
      case 'Inactive': return '#EF4444'; // Tailwind red-500
      default: return '#6B7280'; // Tailwind gray-500
    }
  };

  return (
    <span style={{
      fontWeight: 600,
      color: getStatusColor()
    }}>
      {status}
    </span>
  );
};

const DataGridPage: React.FC = () => {
  // State for grid and dialog
  const [rowData, setRowData] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Pending' },
    { id: 3, name: 'Mark Wilson', role: 'Manager', status: 'Inactive' }
  ]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);

  // Column definitions with custom rendering
  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: 'ID',
      field: 'id',
      filter: true,
      sortable: true,
      width: 80,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      sortable: true,
      flex: 1
    },
    {
      headerName: 'Role',
      field: 'role',
      filter: true,
      sortable: true,
      flex: 1
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: true,
      sortable: true,
      flex: 1,
      cellRenderer: StatusCellRenderer
    },
  ], []);

  // Grid options with enhanced features
  const gridOptions: GridOptions = {
    columnDefs,
    rowData,
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple',
    onGridReady: (params: GridReadyEvent) => {
      params.api.sizeColumnsToFit();
    },
    onSelectionChanged: (event) => {
      const selectedRows = event.api.getSelectedRows();
      setSelectedRows(selectedRows);
    }
  };

  // Handlers for employee management
  const handleAddEmployee = () => {
    setIsAddEmployeeDialogOpen(true);
  };

  const handleCloseAddEmployeeDialog = () => {
    setIsAddEmployeeDialogOpen(false);
  };

  const handleDeleteSelectedRows = () => {
    const updatedRowData = rowData.filter(
      row => !selectedRows.some(selectedRow => selectedRow.id === row.id)
    );
    setRowData(updatedRowData);
    setSelectedRows([]);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{
        height: '100vh',
        padding: '20px',
        background: webLightTheme.colorNeutralBackground1
      }}>
        <h2>Employee Data Grid</h2>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <div>
            <Button
              appearance="primary"
              style={{ marginRight: '10px' }}
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
            {selectedRows.length > 0 && (
              <Button
                appearance="secondary"
                onClick={handleDeleteSelectedRows}
              >
                Delete Selected ({selectedRows.length})
              </Button>
            )}
          </div>
        </div>

        {/* AG Grid */}
        <div
          style={{
            height: 400,
            width: '100%',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'
          }}
          className="ag-theme-quartz"
        >
          <AgGridReact
            {...gridOptions}
          />
        </div>

        {/* Add Employee Dialog */}
        {isAddEmployeeDialogOpen && (
          <Dialog open={isAddEmployeeDialogOpen} onOpenChange={handleCloseAddEmployeeDialog}>
            <DialogSurface>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogContent>
                {/* TODO: Add form fields for new employee */}
                Form content goes here
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={handleCloseAddEmployeeDialog}>
                  Cancel
                </Button>
                <Button appearance="primary">
                  Add
                </Button>
              </DialogActions>
            </DialogSurface>
          </Dialog>
        )}
      </div>
    </FluentProvider>
  );
};

export default DataGridPage;