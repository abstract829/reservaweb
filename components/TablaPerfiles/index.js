import { useQueryPerfiles } from '../../hooks/perfiles'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddPerfil from './AddPerfil'
import EditPerfil from './EditPerfil'
import Funciones from './Funciones'

export default function TablaUsuarios() {
  const { data: listadoPerfiles, isLoading, isError } = useQueryPerfiles()
  const { searchValue, handleChange, filterListado } = useSearch('Nombre')
  const columns = ['ID', 'Nombre', 'Activo', 'Funciones']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalComponent
          title="Crear Perfil"
          btn={<PlusButton />}
          content={<AddPerfil />}
        />
        <input
          className="input"
          placeholder="Busca un perfil..."
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <DefaultTable columns={columns} extra={1}>
          {listadoPerfiles &&
            filterListado(listadoPerfiles.data).map((perfil) => (
              <tr key={perfil.PerfilId} className="bg-white border-b ">
                <td className="td-default">{perfil.PerfilId}</td>
                <td className="td-default">{perfil.Nombre}</td>
                <td className="td-default">{perfil.Activo}</td>
                <td>
                  <ModalComponent
                    title="Editar funciones"
                    btn={<span className="td-edited">Ver</span>}
                    content={<Funciones id={perfil.PerfilId} />}
                  />
                </td>
                <td className="text-right">
                  <ModalComponent
                    title="Editar Perfil"
                    btn={<span className="td-edited">Editar</span>}
                    content={<EditPerfil id={perfil.PerfilId} />}
                  />
                </td>
              </tr>
            ))}
        </DefaultTable>
      </LoaderWhen>
    </>
  )
}
