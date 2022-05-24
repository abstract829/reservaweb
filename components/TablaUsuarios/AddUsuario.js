import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import useListadoUsuarios from '../../hooks/useListadoUsuarios'
const AddUsuario = () => {
  const { listadoPerfilesActivos } = useListadoUsuarios()
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
    Nombre: '',
    Email: '',
    Activo: 'SI',
    PerfilId: listadoPerfilesActivos[0].PerfilId.toString(),
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
  const handleSubmit = (values) => {
    console.log(values)
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
    </div>
  )
}
export default AddUsuario
