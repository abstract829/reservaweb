import RenderIf from './RenderIf'

const Alert = ({ type, children, className }) => {
  return (
    <>
      <RenderIf isTrue={type === 'success'}>
        <span className={'mt-8 bg-green-200 px-4 py-2 ' + className}>
          {children}
        </span>
      </RenderIf>
      <RenderIf isTrue={type === 'failed'}>
        <span className={'mt-8 bg-red-200 px-4 py-2 ' + className}>
          {children}
        </span>
      </RenderIf>
    </>
  )
}
export default Alert
