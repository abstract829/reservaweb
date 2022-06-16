import { useDeleteFeriado, useQueryFeriados } from '../../hooks/feriados'
import { dateParse } from '../../utils/utils'
import Alert from '../Alert'
import Alerts from '../Alerts'
import ConfirmModal from '../ConfirmModal'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddFeriado from './AddFeriado'

const TablaFeriados = () => {
  const { data: feriados, isError, isLoading } = useQueryFeriados()
  const {
    mutate: deleteFeriado,
    isErrorMutating,
    isSuccess,
  } = useDeleteFeriado()
  const columns = ['Fecha']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (feriado) => {
    deleteFeriado({ FeriadoId: feriado.FeriadoId })
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <ModalComponent
        title="Agregar feriado"
        btn={<PlusButton />}
        content={<AddFeriado />}
      />
      <DefaultTable columns={columns} extra={1}>
        {feriados &&
          feriados.data.map((feriado) => (
            <tr key={feriado.FeriadoId}>
              <td className="td-default">{dateParse(feriado.Fecha)}</td>
              <td className="text-right">
                <ConfirmModal
                  onSubmit={() => handleSubmit(feriado)}
                  title={`Eliminar ${dateParse(feriado.Fecha)}`}
                  btn={<span className="td-edited">Eliminar</span>}
                />
              </td>
            </tr>
          ))}
      </DefaultTable>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Feriado eliminado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default TablaFeriados
