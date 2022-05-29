import { useMutateSala, useQuerySalaById } from '../../hooks/salas'
import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alerts from '../Alerts'
import LoaderWhen from '../LoaderWhen'
import Alert from '../Alert'
const DiasBloqueados = ({ id }) => {
  const { data: sala, isLoading, isError } = useQuerySalaById({ id })
  const {
    mutate: editSala,
    isError: isErrorMutating,
    isSuccess,
  } = useMutateSala()
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const inputForms = [
    {
      label: 'Lunes',
      type: 'select',
      name: 'Lunes',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Martes',
      type: 'select',
      name: 'Martes',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Miercoles',
      type: 'select',
      name: 'Miercoles',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Jueves',
      type: 'select',
      name: 'Jueves',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Viernes',
      type: 'select',
      name: 'Viernes',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Sabado',
      type: 'select',
      name: 'Sabado',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
    {
      label: 'Domingo',
      type: 'select',
      name: 'Domingo',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
  ]
  const initialValues = {
    Lunes: sala && sala.data.DiasBloqueados.Lunes,
    Martes: sala && sala.data.DiasBloqueados.Martes,
    Miercoles: sala && sala.data.DiasBloqueados.Miercoles,
    Jueves: sala && sala.data.DiasBloqueados.Jueves,
    Viernes: sala && sala.data.DiasBloqueados.Viernes,
    Sabado: sala && sala.data.DiasBloqueados.Sabado,
    Domingo: sala && sala.data.DiasBloqueados.Domingo,
  }
  const validationSchema = Yup.object().shape({
    Lunes: Yup.string().required('Selecciona una opción'),
    Martes: Yup.string().required('Selecciona una opción'),
    Miercoles: Yup.string().required('Selecciona una opción'),
    Jueves: Yup.string().required('Selecciona una opción'),
    Viernes: Yup.string().required('Selecciona una opción'),
    Sabado: Yup.string().required('Selecciona una opción'),
    Domingo: Yup.string().required('Selecciona una opción'),
  })
  const handleSubmit = (values) => {
    const request = {
      ...sala.data,
      DiasBloqueados: {
        ...sala.data.DiasBloqueados,
        ...values,
      },
    }
    editSala(request)
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
        />
        <Alerts
          successIf={isSuccess}
          failedIf={isErrorMutating}
          succesText="Dias editados correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </LoaderWhen>
  )
}
export default DiasBloqueados
