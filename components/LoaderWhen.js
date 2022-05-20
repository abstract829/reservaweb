import { LoadPanel } from 'devextreme-react'

const LoaderWhen = ({ isTrue, children }) => {
  return (
    <>
      {isTrue ? (
        <LoadPanel
          visible={isTrue}
          shading={true}
          shadingColor="rgba(0,0,0,0.4)"
        />
      ) : (
        children
      )}
    </>
  )
}
export default LoaderWhen
