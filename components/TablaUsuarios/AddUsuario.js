import * as Yup from 'yup'
import { useMutateUser } from '../../hooks/users'
import { useQueryPerfilesActivos } from '../../hooks/perfiles'
import FormikForm from '../FormikForm'
import Alert from '../Alert'
import Alerts from '../Alerts'
const AddUsuario = () => {
  const {
    data: listadoPerfilesActivos,
    isLoading,
    isError,
  } = useQueryPerfilesActivos()
  const {
    mutate: addUser,
    isError: isErrorMutating,
    isSuccess,
  } = useMutateUser()
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'Nombre',
      placeholder: 'Nombre Apellido',
    },
    {
      label: 'Email',
      type: 'email',
      name: 'Email',
      placeholder: 'example@email.com',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'Password',
      placeholder: '******',
    },
    {
      label: 'Activo',
      type: 'select',
      name: 'Activo',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Perfil',
      type: 'select',
      name: 'PerfilId',
      options:
        listadoPerfilesActivos &&
        listadoPerfilesActivos.data.map((p) => {
          return { value: p.PerfilId, text: p.Nombre }
        }),
    },
  ]
  const initialValues = {
    Nombre: '',
    Email: '',
    Password: '',
    Activo: 'SI',
    PerfilId:
      listadoPerfilesActivos &&
      listadoPerfilesActivos.data[0].PerfilId.toString(),
  }
  const validationSchema = Yup.object().shape({
    Email: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Password: Yup.string().max(20).required('Debe ingresar una password'),
    Activo: Yup.string().required('Seleccione una opción'),
    PerfilId: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = (values) => {
    const usuario = {
      UsuarioId: 0,
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
export default AddUsuario
