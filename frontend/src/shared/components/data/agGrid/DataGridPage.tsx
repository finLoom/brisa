// frontend/src/shared/components/data/agGrid/DataGridPage.tsx
import React, { useState } from 'react';
import { FluentProvider, Button, webLightTheme } from '@fluentui/react-components';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

const DataGridPage: React.FC = () => {
  const [rowData] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Pending' },
    { id: 3, name: 'Mark Wilson', role: 'Manager', status: 'Inactive' }
  ]);

  const columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, width: 80 },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, flex: 1 },
    { headerName: 'Role', field: 'role', sortable: true, filter: true, flex: 1 },
    { headerName: 'Status', field: 'status', sortable: true, filter: true, flex: 1 },
  ];

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ height: '100vh', padding: '20px', background: webLightTheme.colorNeutralBackground1 }}>
        <h2>Employee Data Grid</h2>
        <div style={{ height: 400, width: '100%', boxShadow: '0px 2px 10px rgba(0,0,0,0.1)' }} className="ag-theme-balham">
          <AgGridReact 
            rowData={rowData} 
            columnDefs={columnDefs} 
            pagination={true} 
          />
        </div>
        <Button appearance="primary" style={{ marginTop: 20 }}>Add Employee</Button>
      </div>
    </FluentProvider>
  );
};

export default DataGridPage;