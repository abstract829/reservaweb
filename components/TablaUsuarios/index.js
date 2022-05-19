import React from 'react'
import 'devextreme/dist/css/dx.light.css'

import {
  DataGrid,
  ColumnFixing,
  ColumnChooser,
} from 'devextreme-react/data-grid'
import { employees } from './employees'
const TablaUsuarios = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <DataGrid
        columnAutoWidth={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        dataSource={employees}
        keyExpr="EmployeeID"
      >
        <ColumnFixing enabled={true} />
        <ColumnChooser enabled={true} mode="select" />
      </DataGrid>
    </div>
  )
}

export default TablaUsuarios
