import Sidebar from "./sidebar"
import Header from "./header"

function Layout({ children }) {
  return (
    <div className="theme-dark background-deep-0 full-height text-primary">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 squish-inset-l overflow">{children}</main>
      </div>
    </div>
  )
}

export default Layout
