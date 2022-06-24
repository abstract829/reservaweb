import { useMutateUser } from '../../hooks/users'
import { useQueryPerfilesActivos } from '../../hooks/perfiles'
import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alert from '../Alert'
import Alerts from '../Alerts'
import LoaderWhen from '../LoaderWhen'
const EditUsuario = ({ user, closeModal }) => {
  const {
    data: listadoPerfilesActivos,
    isLoading,
    isError,
  } = useQueryPerfilesActivos()
  const {
    mutate: editUser,
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
    Nombre: user.Nombre,
    Email: user.Email,
    Activo: user.Activo,
    PerfilId: user.PerfilId,
  }
  const validationSchema = Yup.object().shape({
    Email: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
    PerfilId: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = async (values) => {
    const usuario = {
      ...user,
      ...values,
    }
    editUser(usuario)
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="w-96">
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Guardar"
          closeForm={closeModal}
        />
      </div>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Usuario editado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default EditUsuario
