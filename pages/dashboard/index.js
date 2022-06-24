import DashboardHomeLayout from '../../components/DashboardHomeLayout'
import DashboardLayout from '../../components/DashboardLayout'
import useAuth from '../../hooks/useAuth'

const DashboardPage = () => {
  const { user } = useAuth()
  return (
    <div className="h-screen w-full bg-[url('../public/imgs/bgdonmelchor.jpg')] object-cover">
      <div className="w-full h-screen bg-black bg-opacity-80">
        <div className="flex flex-col items-center justify-center p-12">
          <div>
            <img
              src="/imgs/homeimg.jpg"
              className="object-cover border-4 rounded-full border-primary h-96 w-96"
            />
          </div>
          <div className="p-8">
            <h2 className="text-3xl text-white font-primary">
              Bienvenido, {user && user.Nombre}.
            </h2>
          </div>
        </div>
      </div>
      {/* <img
        src="imgs/bgdonmelchor.jpg"
        alt="home"
        className="object-cover w-full h-screen"
      /> */}
    </div>
  )
}
DashboardPage.getLayout = function getLayout(page) {
  return <DashboardHomeLayout>{page}</DashboardHomeLayout>
}
export default DashboardPage
