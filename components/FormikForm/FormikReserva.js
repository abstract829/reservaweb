import { Formik, Form } from 'formik'
import FormGroup from './FormGroup'
import RenderIf from '../RenderIf'
import LoadIndicatorIf from '../LoadIndicatorIf'
import AsistentesTable from '../Calendar/AsistentesTable'

const FormikReserva = ({
  inputForms,
  initialValues,
  validationSchema,
  submitFunction,
  btnText,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await submitFunction(values)
        } catch (error) {
          const message = error.message || 'Hubo un error inesperado'
          setStatus({ success: false })
          setErrors({ submit: message })
          setSubmitting(false)
        }
      }}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto overflow-y-auto max-h-96"
        >
          <RenderIf isTrue={errors.submit}>
            <span className="px-2 text-white bg-red-400">{errors.submit}</span>
          </RenderIf>
          <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
            Datos de quien realiza la reserva:
          </p>
          <div className="grid grid-cols-4 gap-4">
            {inputForms.map((input, index) => (
              <FormGroup
                key={index}
                label={input.label}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                options={input.options ? input.options : null}
              />
            ))}
          </div>
          <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
            Asistentes al tour:
          </p>
          <div>
            <AsistentesTable />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full mt-8 font-bold uppercase button"
          >
            <LoadIndicatorIf isTrue={isSubmitting} />
            {btnText}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikReserva
