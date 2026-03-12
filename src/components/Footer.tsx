export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo & Copyright */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GA</span>
          </div>
          <span className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Green Arch. All rights reserved.
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a href="#features" className="text-gray-500 hover:text-gray-300 text-sm transition">Features</a>
          <a href="#how-it-works" className="text-gray-500 hover:text-gray-300 text-sm transition">How it Works</a>
          <a href="/upload" className="text-gray-500 hover:text-gray-300 text-sm transition">Upload</a>
        </div>

      </div>
    </footer>
  )
}