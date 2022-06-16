import { useQuerySalas } from '../../hooks/salas'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import LoaderWhen from '../LoaderWhen'
const ConfirmarHorario = ({ precio = '' }) => {
  const { data, isError, isLoading } = useQuerySalas()
  if (isLoading) {
    return <LoaderWhen isTrue={isLoading} />
  }
  if (isError) {
    return <p>Hubo un error inesperado</p>
  }
  const form = [
    {
      label: 'Sala',
      type: 'select',
      name: 'SalaId',
      options:
        data &&
        data.data.map((sala) => ({ value: sala.SalaId, text: sala.Nombre })),
      validations: [{ type: 'required' }],
    },
    {
      label: 'Fecha',
      type: 'date',
      name: 'Fecha',
      validations: [{ type: 'required' }],
    },
    {
      label: 'Hora inicio',
      type: 'text',
      name: 'FechaInicio',
      validations: [{ type: 'required' }],
    },
    {
      label: 'Hora termino',
      type: 'text',
      name: 'FechaTermino',
      validations: [{ type: 'required' }],
    },
  ]
  const handleSubmit = async (values) => {
    console.log(values)
  }
  return (
    <>
      <div>
        <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
          Total a pagar: {precio} - Limite de personas: 11
        </p>
        <NewForm form={form} submitFunction={handleSubmit} btnText="Reservar" />

        {/* <Alerts
          successIf={isSuccess}
          failedIf={isError}
          succesText="Reserva creada correctamente!"
          failedText="Hubo un error inesperado"
        /> */}
      </div>
    </>
  )
}
export default ConfirmarHorario
