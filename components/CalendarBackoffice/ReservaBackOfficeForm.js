import { useMutateReserva } from '../../hooks/reservas'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import form from './form-backoffice.json'
const ReservaBackOfficeForm = ({ precio = '' }) => {
  const { mutate: realizarReserva, isError, isSuccess } = useMutateReserva()
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
        <Alerts
          successIf={isSuccess}
          failedIf={isError}
          succesText="Reserva creada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default ReservaBackOfficeForm
