import SubModulo from './SubModulo'

const Modulo = ({ modulo }) => {
  return (
    <>
      <h2 className="text-center text-white bg-primary">{modulo.nombre}</h2>
      <div className="flex flex-wrap gap-4">
        {modulo.mis_submodulos.map((subModulo) => (
          <SubModulo subModulo={subModulo} key={subModulo.id} />
        ))}
      </div>
    </>
  )
}
export default Modulo
