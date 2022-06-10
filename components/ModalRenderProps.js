import React from 'react'
import Modal from 'react-modal'

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

export default function ModalRenderProps({
  btn = 'Open Modal',
  title = 'Modal title',
  onOpen = () => null,
  onClose = () => null,
  saveText = 'Guardar',
  children,
}) {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const onSubmit = (fnc) => {
    console.log(fnc)
    fnc()
  }
  function openModal() {
    onOpen()
    setIsOpen(true)
  }
  function closeModal() {
    onClose()
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>{btn}</button>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h3 className="mb-8 bg-[#908161] p-2 text-center text-white ">
          {title}
        </h3>
        <div className="px-4 py-2">
          {children(onSubmit)}
          <div className="flex justify-between mt-8">
            <button
              className="px-4 py-2 text-white bg-primary"
              onClick={onSubmit}
            >
              {saveText}
            </button>
            <button
              className="px-4 py-2 text-white bg-slate-600"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
