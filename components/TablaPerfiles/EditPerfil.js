import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from 'react-query'
import Alerts from '../Alerts'
import { fetchGuardarPerfil } from '../../services/user'
const EditPerfil = ({ perfil }) => {
  const queryClient = useQueryClient()
  const {
    mutate: editPerfil,
    isError,
    isSuccess,
  } = useMutation(fetchGuardarPerfil, {
    onSuccess: () => {
      queryClient.invalidateQueries(['listaPerfiles'])
    },
  })
  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'Nombre',
      placeholder: 'Nombre',
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
  ]
  const initialValues = {
    Nombre: perfil.Nombre,
    Activo: perfil.Activo,
  }
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = (values) => {
    editPerfil({ ...perfil, ...values })
  }
  return (
    <div className="w-96">
      <FormikForm
        inputForms={inputForms}
        initialValues={initialValues}
        validationSchema={validationSchema}
        submitFunction={handleSubmit}
        btnText="Guardar"
      />
      <Alerts
        successIf={isSuccess}
        failedIf={isError}
        succesText="Perfil editado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </div>
  )
}
export default EditPerfil
