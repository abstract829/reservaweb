import { Form, Formik } from 'formik'
import React from 'react'
import Modal from 'react-modal'
import LoadIndicatorIf from '../LoadIndicatorIf'
import RenderIf from '../RenderIf'
import FormGroup from './FormGroup'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#modal-root')

export default function FormikModal({
  openModalButtonText = 'Open Modal',
  modalTitle = 'Modal title',
  onOpenModal = () => null,
  onCloseModal = () => null,
  saveButtonText = 'Guardar',
  inputForms,
  initialValues,
  validationSchema,
  submitFunction,
  scroll = false,
}) {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    onOpenModal()
    setIsOpen(true)
  }
  function closeModal() {
    onCloseModal()
    setIsOpen(false)
  }
  return (
    <div>
      <button onClick={openModal}>{openModalButtonText}</button>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="max-w-5xl">
          <h3 className="mb-8 bg-[#908161] p-2 text-center text-white ">
            {modalTitle}
          </h3>
          <div className="px-4 py-2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
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
                <>
                  <Form onSubmit={handleSubmit} className="px-4">
                    <div className={scroll ? ' max-h-96 overflow-y-auto' : ''}>
                      <RenderIf isTrue={errors.submit}>
                        <span className="px-2 text-white bg-red-400">
                          {errors.submit}
                        </span>
                      </RenderIf>
                      <div className="w-96">
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
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="submit"
                        className="px-4 py-2 text-white bg-primary"
                      >
                        {saveButtonText}
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-slate-600"
                        onClick={closeModal}
                      >
                        Cerrar
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  )
}
