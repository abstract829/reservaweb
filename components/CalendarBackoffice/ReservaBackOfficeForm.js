import {
  useCreateReservaBackOffice,
  useMutateReserva,
} from '../../hooks/reservas'
import useAuth from '../../hooks/useAuth'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import form from './form-backoffice.json'
const ReservaBackOfficeForm = ({ precio = '', closeModal, dataSala }) => {
  const {
    mutate: realizarReserva,
    isError,
    isSuccess,
  } = useCreateReservaBackOffice()
  const { user } = useAuth()
  const handleSubmit = async (values) => {
    const request = {
      ...dataSala,
      ...values,
      TipoVisita: 'EXPERIENCIA DON MELCHOR',
      Estado: 'SOLICITADA',
      TipoPersona: 'PERSONA',
      PersonaId: 8,
      Solicitante: {
        ...user,
        PersonaId: 8,
      },
    }
    console.log(request)
    realizarReserva(request)
  }
  return (
    <>
      <div>
        {/* <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
          Total a pagar: {precio} - Limite de personas: 11
        </p> */}
        <NewForm
          form={form}
          submitFunction={handleSubmit}
          btnText="Reservar"
          closeForm={closeModal}
        />
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
