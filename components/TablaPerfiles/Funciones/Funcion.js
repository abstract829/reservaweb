const Funcion = ({ funcion, myFunciones, perfil }) => {
  const handleChange = (e, funcion) => {
    if (e.target.checked) {
      console.log('checked', funcion)
    } else {
      console.log('not checked')
    }
  }
  const hasFunction = (id) => {
    return myFunciones.data.data.find(
      (funcion) => Number(funcion.FuncionId) === Number(id)
    )
  }
  return (
    <div className="flex items-center gap-1 my-2 ">
      <input
        type="checkbox"
        defaultChecked={hasFunction(funcion.id)}
        name={funcion.id}
        onChange={(e) => handleChange(e, funcion)}
      />
      <label className="font-bold text-primary">{funcion.nombre}</label>
    </div>
  )
}
export default Funcion
