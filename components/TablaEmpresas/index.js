import { useDeleteEmpresa, useQueryEmpresas } from '../../hooks/empresas'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import Alerts from '../Alerts'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddEmpresa from './AddEmpresa'
import EditEmpresa from './EditEmpresa'

export default function TablaEmpresas() {
  const { data: listadoEmpresas, isLoading, isError } = useQueryEmpresas()
  const {
    mutate: deleteEmpresa,
    isErrorMutating,
    isSuccess,
  } = useDeleteEmpresa()
  const { searchValue, handleChange, filterListado } = useSearch('Nombre')
  const columns = ['ID', 'Nombre', 'Rut', 'Activo', 'CodigoSAP']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (EmpresaId) => {
    deleteEmpresa({ EmpresaId })
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
        <DefaultTable columns={columns} extra={2}>
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
                <td
                  className="td-edited"
                  onClick={() => handleSubmit(empresa.EmpresaId)}
                >
                  Eliminar
                </td>
              </tr>
            ))}
        </DefaultTable>
        <Alerts
          successIf={isSuccess}
          failedIf={isErrorMutating}
          succesText="Empresa eliminada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </LoaderWhen>
    </>
  )
}
