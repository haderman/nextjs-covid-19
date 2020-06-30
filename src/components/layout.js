import Sidebar from "./sidebar"

function Layout({ children }) {
  return (
    <div className="theme-dark background-deep-0 full-height text-primary flex">
      <Sidebar />
      <main className="inset-m">{children}</main>
    </div>
  )
}

export default Layout
