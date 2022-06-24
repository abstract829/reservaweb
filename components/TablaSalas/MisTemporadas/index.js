import { useMutateSala, useQuerySalaById } from '../../../hooks/salas'
import { dateParse } from '../../../utils/utils'
import Alert from '../../Alert'
import Alerts from '../../Alerts'
import ConfirmModal from '../../ConfirmModal'
import DefaultTable from '../../DefaultTable'
import LoaderWhen from '../../LoaderWhen'
import ModalComponent from '../../Modal'
import ModalRP from '../../ModalRP'
import PlusButton from '../../PlusButton'
import AddTemporada from './AddTemporada'
import MisHorarios from './MisHorarios'

const MisTemporadas = ({ id }) => {
  const { data: sala, isError, isLoading } = useQuerySalaById({ id })
  const { mutate: editSala, isSuccess, isErrorMutating } = useMutateSala()
  const columns = ['Fecha de inicio', 'Fecha de fin', 'Comentario', 'Horarios']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (temporada) => {
    const request = {
      ...sala.data,
      MisTemporadas: sala.data.MisTemporadas.filter(
        (f) => Number(f.SalaTemporadaId) !== Number(temporada.SalaTemporadaId)
      ),
    }
    editSala(request)
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <ModalRP title="Crear Temporada" btn={<PlusButton />}>
        {(closeModal) => (
          <AddTemporada sala={sala && sala.data} closeModal={closeModal} />
        )}
      </ModalRP>
      <DefaultTable columns={columns} extra={1}>
        {sala &&
          sala.data.MisTemporadas.map((temporada) => (
            <tr key={temporada.SalaTemporadaId}>
              <td className="td-default">{dateParse(temporada.FechaDesde)}</td>
              <td className="td-default">{dateParse(temporada.FechaHasta)}</td>
              <td className="td-default max-w-[16rem]">
                {temporada.Comentario}
              </td>
              <td>
                <ModalComponent
                  title="Horarios"
                  btn={<span className="td-edited">Ver</span>}
                  content={
                    <MisHorarios sala={sala.data} temporada={temporada} />
                  }
                />
              </td>
              <td className="text-right">
                <ConfirmModal
                  onSubmit={() => handleSubmit(temporada)}
                  title={`Eliminar Temporada`}
                  btn={<span className="td-edited">Eliminar</span>}
                />
              </td>
            </tr>
          ))}
      </DefaultTable>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Temporada eliminada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default MisTemporadas
