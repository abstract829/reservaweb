import Sidebar from './Sidebar'

const DashboardHomeLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-100">
      <div className="fixed h-full">
        <Sidebar />
      </div>
      <div className="ml-[270px] w-full">{children}</div>
    </div>
  )
}
export default DashboardHomeLayout
