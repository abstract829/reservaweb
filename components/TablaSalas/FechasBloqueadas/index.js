import { useMutateSala, useQuerySalaById } from '../../../hooks/salas'
import { dateParse } from '../../../utils/utils'
import Alert from '../../Alert'
import Alerts from '../../Alerts'
import ConfirmModal from '../../ConfirmModal'
import DefaultTable from '../../DefaultTable'
import LoaderWhen from '../../LoaderWhen'
import ModalComponent from '../../Modal'
import PlusButton from '../../PlusButton'
import AddFecha from './AddFecha'

const FechasBloqueadas = ({ id }) => {
  const { data: sala, isError, isLoading } = useQuerySalaById({ id })
  const { mutate: editSala, isErrorMutating, isSuccess } = useMutateSala()
  const columns = ['Fecha', 'Motivo']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (fecha) => {
    const request = {
      ...sala.data,
      MisFechasBloqueadas: sala.data.MisFechasBloqueadas.filter(
        (f) => Number(f.SalaFechaBloqueoId) !== Number(fecha.SalaFechaBloqueoId)
      ),
    }
    editSala(request)
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <ModalComponent
        title="Crear Fecha de Bloqueo"
        btn={<PlusButton />}
        content={<AddFecha sala={sala && sala.data} />}
      />
      <DefaultTable columns={columns} extra={1}>
        {sala &&
          sala.data.MisFechasBloqueadas.map((fecha) => (
            <tr key={fecha.SalaFechaBloqueoId}>
              <td className="td-default">{dateParse(fecha.Fecha)}</td>
              <td className="td-default max-w-[16rem]">{fecha.Motivo}</td>
              <td>
                <ConfirmModal
                  onSubmit={() => handleSubmit(fecha)}
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
        succesText="Fecha eliminada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default FechasBloqueadas
