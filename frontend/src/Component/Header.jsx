function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-200 bg-green-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h1 className="text-xl font-bold tracking-tight text-green-900">Kissan Connect</h1>

        <nav>
          <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-green-800 sm:gap-6 sm:text-base">
            <li>
              <a href="#home" className="transition-colors duration-200 hover:text-green-600">
                Home
              </a>
            </li>
            <li>
              <a href="#products" className="transition-colors duration-200 hover:text-green-600">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="transition-colors duration-200 hover:text-green-600">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors duration-200 hover:text-green-600">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header