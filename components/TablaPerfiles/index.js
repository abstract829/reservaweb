import useListadoUsuarios from '../../hooks/useListadoUsuarios'
import useSearch from '../../hooks/useSearch'
import useSelecteds from '../../hooks/useSelecteds'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddPerfil from './AddPerfil'
import EditPerfil from './EditPerfil'
import Funciones from './Funciones'

export default function TablaUsuarios() {
  const { listadoPerfiles, isLoading } = useListadoUsuarios()
  const { searchValue, handleChange, filterListado } = useSearch()
  const { setSelectedPerfil } = useSelecteds()
  const columns = ['ID', 'Nombre', 'Activo', 'Funciones']
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-white uppercase bg-primary ">
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-6 py-3">
                    {column}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listadoPerfiles &&
                filterListado(listadoPerfiles).map((perfil) => (
                  <tr key={perfil.PerfilId} className="bg-white border-b ">
                    <td className="px-6 py-4">{perfil.PerfilId}</td>
                    <td className="px-6 py-4">{perfil.Nombre}</td>
                    <td className="px-6 py-4">{perfil.Activo}</td>
                    <td>
                      <ModalComponent
                        title="Editar funciones"
                        btn={
                          <span className="px-6 py-4 font-medium text-right cursor-pointer text-primary hover:underline">
                            Ver
                          </span>
                        }
                        onClose={() => setSelectedPerfil(null)}
                        content={<Funciones perfil={perfil} />}
                      />
                    </td>
                    <td>
                      <ModalComponent
                        title="Editar Perfil"
                        btn={
                          <span className="px-6 py-4 font-medium text-right cursor-pointer text-primary hover:underline">
                            Editar
                          </span>
                        }
                        content={<EditPerfil perfil={perfil} />}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </LoaderWhen>
    </>
  )
}
