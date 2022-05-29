import { useMutateSala } from '../../../../hooks/salas'
import Alerts from '../../../Alerts'
import DefaultTable from '../../../DefaultTable'
import ModalComponent from '../../../Modal'
import PlusButton from '../../../PlusButton'
import AddHorario from './AddHorario'

const MisHorarios = ({ sala, temporada }) => {
  const { mutate: editSala, isSuccess, isErrorMutating } = useMutateSala()
  const columns = ['Hora', 'Disponible']
  const handleSubmit = (horario) => {
    const request = {
      ...sala,
      MisTemporadas: sala.MisTemporadas.map((t) => {
        if (t.SalaTemporadaId === temporada.SalaTemporadaId) {
          return {
            ...t,
            MisHorarios: t.MisHorarios.filter(
              (h) => h.SalaTemporadaHorarioId !== horario.SalaTemporadaHorarioId
            ),
          }
        } else {
          return t
        }
      }),
    }
    editSala(request)
  }
  return (
    <div>
      <ModalComponent
        title="Agregar Horario"
        btn={<PlusButton />}
        content={<AddHorario sala={sala} temporada={temporada} />}
      />
      <DefaultTable columns={columns} extra={1}>
        {temporada &&
          temporada.MisHorarios.map((horario) => (
            <tr key={horario.SalaTemporadaHorarioId}>
              <td className="td-default">{horario.Horario}</td>
              <td className="td-default">{horario.Disponible}</td>
              <td
                className="text-right td-edited"
                onClick={() => handleSubmit(horario)}
              >
                Eliminar
              </td>
            </tr>
          ))}
      </DefaultTable>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Horario eliminado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default MisHorarios
