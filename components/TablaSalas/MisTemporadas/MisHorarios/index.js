import { useMutateSala } from '../../../../hooks/salas'
import Alerts from '../../../Alerts'
import DefaultTable from '../../../DefaultTable'
import ModalComponent from '../../../Modal'
import ModalRP from '../../../ModalRP'
import PlusButton from '../../../PlusButton'
import AddHorario from './AddHorario'
import EditHorario from './EditHorario'

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
      <ModalRP title="Agregar Horario" btn={<PlusButton />}>
        {(closeModal) => (
          <AddHorario
            sala={sala}
            temporada={temporada}
            closeModal={closeModal}
          />
        )}
      </ModalRP>
      <DefaultTable columns={columns} extra={2}>
        {temporada &&
          temporada.MisHorarios.map((horario) => (
            <tr key={horario.SalaTemporadaHorarioId}>
              <td className="td-default">{horario.Horario}</td>
              <td className="td-default">{horario.Disponible}</td>
              <td className="text-right">
                <ModalRP
                  title="Editar Horario"
                  btn={<span className="td-edited">Editar</span>}
                >
                  {(closeModal) => (
                    <EditHorario
                      sala={sala}
                      temporada={temporada}
                      closeModal={closeModal}
                      horario={horario}
                    />
                  )}
                </ModalRP>
              </td>
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
