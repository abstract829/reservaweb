import { useState } from 'react'
import * as Yup from 'yup'
import useReserva from '../../hooks/useReserva'
import { checkRut } from '../../utils/utils'
import Alerts from '../Alerts'
import FormikForm from '../FormikForm'

const AddAsistente = ({ setAsistentes }) => {
  const { setAsistente } = useReserva()
  const [success, setSuccess] = useState(false)
  const inputForms = [
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
      placeholder: 'example@email.com',
    },
    {
      label: 'RUT',
      type: 'text',
      name: 'NumeroDocumento',
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
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
      label: 'Pais',
      type: 'select',
      name: 'PaisId',
      options: [{ value: '1', text: 'Chile' }],
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
    },
  ]
  const initialValues = {
    NombreCompleto: '',
    CorreoElectronico: '',
    NumeroDocumento: '',
    Telefono: '',
    FechaNacimiento: '',
    Genero: 'MASCULINO',
    PaisId: '1',
    Ciudad: '',
  }
  const validationSchema = Yup.object().shape({
    CorreoElectronico: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('El campo es obligatorio'),
    NombreCompleto: Yup.string().required('El campo es obligatorio'),
    FechaNacimiento: Yup.string().required('El campo es obligatorio'),
    NumeroDocumento: Yup.string().required('El campo es obligatorio'),
    Telefono: Yup.string().required('El campo es obligatorio'),
    Genero: Yup.string().required('El campo es obligatorio'),
    PaisId: Yup.string().required('El campo es obligatorio'),
    Ciudad: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = (values) => {
    const [isValidRut, Rut] = checkRut(values.NumeroDocumento)
    if (isValidRut) {
      setAsistente(values)
      setSuccess(true)
    } else {
      throw new Error('RUT Invalido')
    }
  }
  return (
    <>
      <div className="w-96">
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Guardar"
        />
        <Alerts
          successIf={success}
          failedIf={false}
          succesText="Asistente agregado correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default AddAsistente
