import { Formik, Form, Field } from 'formik'
import FormGroup from './FormGroup'
import RenderIf from '../RenderIf'
import LoadIndicatorIf from '../LoadIndicatorIf'
import AsistentesTable from '../Calendar/AsistentesTable'
import { useState } from 'react'

const FormikReserva = ({
  inputForms,
  initialValues,
  validationSchema,
  submitFunction,
  btnText,
}) => {
  const [isOtro, setIsOtro] = useState(false)
  const [otroValue, setOtroValue] = useState('')
  const radioOpts = [
    'Pagina web',
    'Prensa',
    'Recomendación',
    'Tour operador',
    'Redes sociales',
  ]
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values.ComoSeEntero === 'Otro') {
            values = {
              ...values,
              ComoSeEntero: otroValue,
            }
          }
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
        <Form onSubmit={handleSubmit} className="max-w-5xl mx-auto ">
          <RenderIf isTrue={errors.submit}>
            <span className="p-2 text-white bg-red-400">{errors.submit}</span>
          </RenderIf>
          <div className="mt-4 overflow-y-auto max-h-96">
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
              <div>
                <p className="mb-2 font-bold text-[#908161]">
                  ¿Como se informó de este tour?
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {radioOpts.map((opt) => (
                    <label className="flex items-center" key={opt}>
                      <Field
                        type="radio"
                        name="ComoSeEntero"
                        value={opt}
                        onClick={() => setIsOtro(false)}
                      />
                      {opt}
                    </label>
                  ))}
                  <label className="flex items-center col-span-2">
                    <Field
                      type="radio"
                      name="ComoSeEntero"
                      value="Otro"
                      onClick={() => setIsOtro(true)}
                    />
                    Otro
                    <input
                      type="text"
                      value={otroValue}
                      onChange={(e) => setOtroValue(e.target.value)}
                      disabled={!isOtro}
                      className="ml-2 rounded border-2 border-[#908161] px-2"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <FormGroup
                label="Requerimientos especiales"
                type="textarea"
                name="RequerimientosEspeciales"
              />
            </div>
            <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
              Asistentes al tour:
            </p>
            <div>
              <AsistentesTable />
            </div>
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
