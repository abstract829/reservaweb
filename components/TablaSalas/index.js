import { useDeleteSala, useQuerySalas } from '../../hooks/salas'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import Alerts from '../Alerts'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddSala from './AddSala'
import DiasBloqueados from './DiasBloqueados'
import EditSala from './EditSala'
import FechasBloqueadas from './FechasBloqueadas'
import MisTemporadas from './MisTemporadas'
export default function TablaSalas() {
  const { data: listadoSalas, isLoading, isError } = useQuerySalas()
  const { mutate: deleteSala, isSuccess, isErrorMutating } = useDeleteSala()
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
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (sala) => {
    deleteSala({ SalaId: sala.SalaId })
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalComponent
          title="Crear Sala"
          btn={<PlusButton />}
          content={<AddSala />}
        />
        <input
          className="input"
          placeholder="Busca una sala..."
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <DefaultTable columns={columns} extra={2}>
          {listadoSalas &&
            filterListado(listadoSalas.data).map((sala) => (
              <tr key={sala.SalaId} className="bg-white border-b ">
                <td className="td-default">{sala.SalaId}</td>
                <td className="td-default">{sala.Nombre}</td>
                <td className="td-default">{sala.DisponibleOnLine}</td>
                <td className="td-default">{sala.Activo}</td>
                <td>
                  <ModalComponent
                    title={`Temporadas - Sala ${sala.Nombre}`}
                    btn={<span className="td-edited">Ver</span>}
                    content={<MisTemporadas id={sala.SalaId} />}
                  />
                </td>
                <td>
                  <ModalComponent
                    title={`Fechas Bloqueadas - Sala ${sala.Nombre}`}
                    btn={<span className="td-edited">Ver</span>}
                    content={<FechasBloqueadas id={sala.SalaId} />}
                  />
                </td>
                <td>
                  <ModalComponent
                    title={`Dias Bloqueados - Sala ${sala.Nombre}`}
                    btn={<span className="td-edited">Ver</span>}
                    content={<DiasBloqueados id={sala.SalaId} />}
                  />
                </td>
                <td className="text-right">
                  <ModalComponent
                    title="Editar Sala"
                    btn={<span className="td-edited">Editar</span>}
                    content={<EditSala id={sala.SalaId} />}
                  />
                </td>
                <td
                  onClick={() => handleSubmit(sala)}
                  className="text-right td-edited"
                >
                  Eliminar
                </td>
              </tr>
            ))}
        </DefaultTable>
        <Alerts
          successIf={isSuccess}
          failedIf={isErrorMutating}
          succesText="Sala eliminada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </LoaderWhen>
    </>
  )
}
