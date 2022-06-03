import * as Yup from 'yup'
import FormikForm from '../FormikForm'
import Alerts from '../Alerts'
import { useMutateUsuarioEmpresa } from '../../hooks/empresas'
const AddUsuarioEmpresa = ({ EmpresaId }) => {
  const {
    mutate: addUser,
    isError: isErrorMutating,
    isSuccess,
  } = useMutateUsuarioEmpresa()
  const inputForms = [
    {
      label: 'Nombre',
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
      label: 'Password',
      type: 'password',
      name: 'Password',
      placeholder: '******',
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
      placeholder: 'Ciudad',
    },
    {
      label: 'Rut',
      type: 'text',
      name: 'NumeroDocumento',
      placeholder: '11.111.111-1',
    },
    {
      label: 'Fecha de Nacimiento',
      type: 'date',
      name: 'FechaNacimiento',
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
      placeholder: '912345678',
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
  ]
  const initialValues = {
    NombreCompleto: '',
    CorreoElectronico: '',
    Password: '',
    Ciudad: '',
    NumeroDocumento: '',
    FechaNacimiento: '',
    Telefono: '',
    Genero: 'MASCULINO',
  }
  const validationSchema = Yup.object().shape({
    CorreoElectronico: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    NombreCompleto: Yup.string().max(255).required('Debe ingresar un nombre'),
    Password: Yup.string().max(20).required('Debe ingresar una password'),
    Ciudad: Yup.string().required('El campo es obligatorio'),
    NumeroDocumento: Yup.string().required('El campo es obligatorio'),
    FechaNacimiento: Yup.string().required('El campo es obligatorio'),
    Telefono: Yup.string().required('El campo es obligatorio'),
    Genero: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = (values) => {
    const usuario = {
      PersonaId: 0,
      EmpresaId,
      PaisId: 1,
      ...values,
    }
    addUser(usuario)
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
      </div>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Usuario creado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default AddUsuarioEmpresa
