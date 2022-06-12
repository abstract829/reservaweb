import * as Yup from 'yup'
import { useMutateReserva } from '../../hooks/reservas'
import useReserva from '../../hooks/useReserva'
import { checkRut } from '../../utils/utils'
import Alerts from '../Alerts'
import FormikReserva from '../FormikForm/FormikReserva'

const ReservaForm = ({ precio = '' }) => {
  const {
    setDatosAsistentePrincipal,
    hasAsistentes,
    reservaRequest,
    validLimitAsistentes,
  } = useReserva()
  const { mutate: realizarReserva, isError, isSuccess } = useMutateReserva()
  const inputForms = [
    {
      label: 'RUT',
      type: 'text',
      name: 'NumeroDocumento',
      placeholder: '11.111.111-1',
    },
    {
      label: 'Nombre Completo',
      type: 'text',
      name: 'NombreCompleto',
      placeholder: 'Nombre Apellido',
    },
    {
      label: 'Email',
      type: 'email',
      name: 'CorreoElectronico',
      placeholder: 'email@example.com',
    },
    {
      label: 'Fecha de nacimiento',
      type: 'date',
      name: 'FechaNacimiento',
    },
    {
      label: 'Genero',
      type: 'select',
      name: 'Genero',
      options: [
        { value: 'MASCULINO', text: 'Hombre' },
        { value: 'FEMENINO', text: 'Mujer' },
      ],
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
      placeholder: '',
    },
    {
      label: 'Pais',
      type: 'select',
      name: 'PaisId',
      options: [{ value: '1', text: 'Chile' }],
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
      placeholder: '',
    },
  ]
  const initialValues = {
    NumeroDocumento: '',
    CorreoElectronico: '',
    NombreCompleto: '',
    FechaNacimiento: '',
    Genero: 'MASCULINO',
    Telefono: '',
    RequerimientosEspeciales: '',
    PaisId: '1',
    ComoSeEntero: '',
    Ciudad: '',
  }
  const validationSchema = Yup.object().shape({
    CorreoElectronico: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('El campo es obligatorio'),
    NombreCompleto: Yup.string().max(255).required('El campo es obligatorio'),
    FechaNacimiento: Yup.string().required('El campo es obligatorio'),
    Telefono: Yup.string().required('El campo es obligatorio'),
    Genero: Yup.string().required('El campo es obligatorio'),
    NumeroDocumento: Yup.string().required('El campo es obligatorio'),
    RequerimientosEspeciales: Yup.string().required('El campo es obligatorio'),
    PaisId: Yup.string().required('El campo es obligatorio'),
    ComoSeEntero: Yup.string().required('El campo es obligatorio'),
    Ciudad: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = async (values) => {
    const [isValidRut, Rut] = checkRut(values.NumeroDocumento)
    const usuario = {
      ...values,
      NumeroDocumento: Rut,
    }
    setDatosAsistentePrincipal(usuario)
    if (isValidRut) {
      if (hasAsistentes()) {
        if (validLimitAsistentes()) {
          realizarReserva(reservaRequest)
        } else {
          throw new Error('Solo puede haber un maximo de 10 asistentes')
        }
      } else {
        throw new Error('Debe ingresar los asistentes')
      }
    } else {
      throw new Error('RUT Invalido')
    }
  }
  return (
    <>
      <div>
        <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
          Total a pagar: {precio} - Limite de personas: 11
        </p>
        <FormikReserva
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Reservar"
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
export default ReservaForm
