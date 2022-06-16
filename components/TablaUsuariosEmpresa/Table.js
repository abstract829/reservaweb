import {
  useDeleteUsuarioEmpresa,
  useQueryUsuariosEmpresa,
} from '../../hooks/empresas'
import useSearch from '../../hooks/useSearch'
import Alerts from '../Alerts'
import ConfirmModal from '../ConfirmModal'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddUsuarioEmpresa from './AddUsuarioEmpresa'
import EditUsuarioEmpresa from './EditUsuarioEmpresa'

const Table = ({ empresaId }) => {
  const {
    data: listaUsuarios,
    isError,
    isLoading,
  } = useQueryUsuariosEmpresa({ empresaId })
  const {
    mutate: deleteUsuario,
    isErrorMutating,
    isSuccess,
  } = useDeleteUsuarioEmpresa()
  const { searchValue, handleChange, filterListado } =
    useSearch('NombreCompleto')
  const columns = [
    'ID',
    'Nombre',
    'Rut',
    'CorreoElectronico',
    'Genero',
    'Ciudad',
    'Telefono',
  ]

  const handleDelete = (id) => {
    console.log(id)
    deleteUsuario(id)
  }
  if (isLoading) {
    return <LoaderWhen isTrue={isLoading} />
  }
  return (
    <LoaderWhen isTrue={!listaUsuarios}>
      <ModalComponent
        title="Crear Usuario Empresa"
        btn={<PlusButton />}
        content={<AddUsuarioEmpresa EmpresaId={empresaId} />}
      />
      <input
        className="input"
        placeholder="Busca un usuario..."
        type="text"
        value={searchValue}
        onChange={handleChange}
      />
      <DefaultTable columns={columns} extra={2}>
        {listaUsuarios &&
          filterListado(listaUsuarios).data.map((usuario) => (
            <tr key={usuario.PersonaId} className="bg-white border-b ">
              <td className="td-default">{usuario.PersonaId}</td>
              <td className="td-default">{usuario.NombreCompleto}</td>
              <td className="td-default">{usuario.NumeroDocumento}</td>
              <td className="td-default">{usuario.CorreoElectronico}</td>
              <td className="td-default">{usuario.Genero}</td>
              <td className="td-default">{usuario.Ciudad}</td>
              <td className="td-default">{usuario.Telefono}</td>
              <td className="text-right">
                <ModalComponent
                  title="Editar Usuario Empresa"
                  btn={<span className=" td-edited">Editar</span>}
                  content={<EditUsuarioEmpresa usuario={usuario} />}
                />
              </td>
              <td>
                <ConfirmModal
                  onSubmit={() => handleDelete(usuario.PersonaId)}
                  title={`Eliminar ${usuario.NombreCompleto}`}
                  btn={<span className="td-edited">Eliminar</span>}
                />
              </td>
            </tr>
          ))}
      </DefaultTable>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Usuario Empresa eliminado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default Table
