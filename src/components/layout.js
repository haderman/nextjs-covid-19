import Sidebar from "./sidebar"

function Layout({ children }) {
  return (
    <div className="theme-dark background-deep-0 full-height text-primary flex">
      <Sidebar />
      <main className="flex-1 squish-inset-l">{children}</main>
    </div>
  )
}

export default Layout
