import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import useListadoUsuarios from '../../hooks/useListadoUsuarios'
import { fetchGuardarUsuario } from '../../services/user'
import { useMutation, useQueryClient } from 'react-query'
import RenderIf from '../RenderIf'
import Alert from '../Alert'
import Alerts from '../Alerts'
const EditUsuario = ({ user }) => {
  const { listadoPerfilesActivos } = useListadoUsuarios()
  const queryClient = useQueryClient()
  const {
    mutate: editUser,
    isError,
    isSuccess,
  } = useMutation(fetchGuardarUsuario, {
    onSuccess: () => {
      queryClient.invalidateQueries(['listaUsuarios'])
    },
  })
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
      options: listadoPerfilesActivos.map((p) => {
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
        failedIf={isError}
        succesText="Usuario editado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default EditUsuario
