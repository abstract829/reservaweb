import 'devextreme/dist/css/dx.light.css'
import {
  DataGrid,
  ColumnFixing,
  ColumnChooser,
  Editing,
  GroupPanel,
  SearchPanel,
} from 'devextreme-react/data-grid'
import useListadoUsuarios from '../../hooks/useListadoUsuarios'
import LoaderWhen from '../LoaderWhen'
const TablaUsuarios = () => {
  const { listadoUsuarios, isLoading } = useListadoUsuarios()
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <div className="mx-auto max-w-5xl">
          <DataGrid
            columnAutoWidth={true}
            allowColumnReordering={true}
            allowColumnResizing={true}
            dataSource={listadoUsuarios}
            keyExpr="id"
          >
            <GroupPanel visible={true} />
            <SearchPanel visible={true} />
            <Editing mode="row" useIcons={true} allowUpdating={true} />
            <ColumnFixing enabled={true} />
            <ColumnChooser enabled={true} mode="select" />
          </DataGrid>
        </div>
      </LoaderWhen>
    </>
  )
}

export default TablaUsuarios
