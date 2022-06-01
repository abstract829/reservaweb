import { useQueryEmpresas } from '../../hooks/empresas'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddEmpresa from './AddEmpresa'
import EditEmpresa from './EditEmpresa'

export default function TablaEmpresas() {
  const { data: listadoEmpresas, isLoading, isError } = useQueryEmpresas()
  const { searchValue, handleChange, filterListado } = useSearch()
  const columns = ['ID', 'Nombre', 'Rut', 'Activo', 'CodigoSAP']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalComponent
          title="Crear Empresa"
          btn={<PlusButton />}
          content={<AddEmpresa />}
        />
        <input
          className="input"
          placeholder="Busca una empresa..."
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <DefaultTable columns={columns} extra={1}>
          {listadoEmpresas &&
            filterListado(listadoEmpresas.data).map((empresa) => (
              <tr key={empresa.EmpresaId} className="bg-white border-b ">
                <td className="td-default">{empresa.EmpresaId}</td>
                <td className="td-default">{empresa.Nombre}</td>
                <td className="td-default">{empresa.Rut}</td>
                <td className="td-default">{empresa.Activo}</td>
                <td className="td-default">{empresa.CodigoSAP}</td>
                <td className="text-right">
                  <ModalComponent
                    title="Editar Empresa"
                    btn={<span className=" td-edited">Editar</span>}
                    content={<EditEmpresa empresa={empresa} />}
                  />
                </td>
              </tr>
            ))}
        </DefaultTable>
      </LoaderWhen>
    </>
  )
}
