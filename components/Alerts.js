import Alert from './Alert'
import RenderIf from './RenderIf'

const Alerts = ({ successIf, failedIf, succesText, failedText }) => {
  return (
    <div className="mt-8">
      <RenderIf isTrue={successIf}>
        <Alert type="success">{succesText}</Alert>
      </RenderIf>
      <RenderIf isTrue={failedIf}>
        <Alert type="failed">{failedText}</Alert>
      </RenderIf>
    </div>
  )
}
export default Alerts
