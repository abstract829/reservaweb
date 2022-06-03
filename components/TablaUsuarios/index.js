import { useQueryUsers } from '../../hooks/users'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddUsuario from './AddUsuario'
import EditUsuario from './EditUsuario'

export default function TablaUsuarios() {
  const { data: listadoUsuarios, isLoading, isError } = useQueryUsers()
  const { searchValue, handleChange, filterListado } = useSearch('Nombre')
  const columns = ['ID', 'Nombre', 'Email', 'Perfil', 'Activo']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalComponent
          title="Crear Usuario"
          btn={<PlusButton />}
          content={<AddUsuario />}
        />
        <input
          className="input"
          placeholder="Busca un usuario..."
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <DefaultTable columns={columns} extra={1}>
          {listadoUsuarios &&
            filterListado(listadoUsuarios.data).map((usuario) => (
              <tr key={usuario.UsuarioId} className="bg-white border-b ">
                <td className="td-default">{usuario.UsuarioId}</td>
                <td className="td-default">{usuario.Nombre}</td>
                <td className="td-default">{usuario.Email}</td>
                <td className="td-default">{usuario.PerfilNombre}</td>
                <td className="td-default">{usuario.Activo}</td>
                <td className="text-right">
                  <ModalComponent
                    title="Editar Usuario"
                    btn={<span className=" td-edited">Editar</span>}
                    content={<EditUsuario user={usuario} />}
                  />
                </td>
              </tr>
            ))}
        </DefaultTable>
      </LoaderWhen>
    </>
  )
}
