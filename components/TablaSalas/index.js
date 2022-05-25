import useListadoSalas from '../../hooks/useListadoSalas'
import useSearch from '../../hooks/useSearch'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import DiasBloqueados from './DiasBloqueados'
import EditSala from './EditSala'

export default function TablaUsuarios() {
  const { listadoSalas, isLoading } = useListadoSalas()
  const { searchValue, handleChange, filterListado } = useSearch()
  const columns = [
    'ID',
    'Nombre',
    'Disponible Online',
    'Activo',
    'Temporadas',
    'Fechas Bloqueadas',
    'Dias Bloqueados',
  ]
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalComponent
          title="Crear Sala"
          btn={<PlusButton />}
          content={<h1>hola</h1>}
        />
        <input
          className="input"
          placeholder="Busca una sala..."
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
              {listadoSalas &&
                filterListado(listadoSalas).map((sala) => (
                  <tr key={sala.SalaId} className="bg-white border-b ">
                    <td className="px-6 py-4">{sala.SalaId}</td>
                    <td className="px-6 py-4">{sala.Nombre}</td>
                    <td className="px-6 py-4">{sala.DisponibleOnLine}</td>
                    <td className="px-6 py-4">{sala.Activo}</td>
                    <td className="px-6 py-4 font-medium cursor-pointer text-primary hover:underline">
                      Ver
                    </td>
                    <td className="px-6 py-4 font-medium cursor-pointer text-primary hover:underline">
                      Ver
                    </td>
                    <td>
                      <ModalComponent
                        title={`Dias Bloqueados - Sala ${sala.Nombre}`}
                        btn={
                          <span className="px-6 py-4 font-medium cursor-pointer text-primary hover:underline">
                            Ver
                          </span>
                        }
                        content={<DiasBloqueados sala={sala} />}
                      />
                    </td>
                    <td>
                      <ModalComponent
                        title="Editar Sala"
                        btn={
                          <span className="px-6 py-4 font-medium text-right cursor-pointer text-primary hover:underline">
                            Editar
                          </span>
                        }
                        content={<EditSala sala={sala} />}
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
