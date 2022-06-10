import { Formik, Form } from 'formik'
import FormGroup from './FormGroup'
import RenderIf from '../RenderIf'
import LoadIndicatorIf from '../LoadIndicatorIf'

const FormikForm = ({
  inputForms,
  initialValues,
  validationSchema,
  submitFunction,
  btnText,
  scroll = false,
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
        <Form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <RenderIf isTrue={errors.submit}>
            <span className="p-2 text-white bg-red-400">{errors.submit}</span>
          </RenderIf>
          <div className={scroll ? 'mt-4 max-h-96 overflow-y-auto' : 'mt-4'}>
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

export default FormikForm
