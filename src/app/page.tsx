import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-gray-950 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">AI-Powered Sustainability Analysis</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Build Software That&apos;s
            <span className="text-emerald-400"> Kind to the Planet</span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your architecture diagrams and get instant, AI-driven
            recommendations to reduce your software&apos;s carbon footprint,
            cut cloud costs, and build more sustainably.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

              href="/upload"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition shadow-lg shadow-emerald-500/25"
            <a>
              Analyze Your Architecture
            </a>

              href="#how-it-works"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-3.5 rounded-lg font-semibold text-lg transition"
            <a>
              See How It Works
            </a>
          </div>

        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Build Green
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful AI analysis meets actionable sustainability insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-5">
                <span className="text-emerald-400 text-2xl">📊</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Smart Diagram Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Upload your architecture diagrams and our AI instantly identifies components,
                connections, and potential sustainability issues.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-5">
                <span className="text-emerald-400 text-2xl">🌱</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Green Recommendations</h3>
              <p className="text-gray-400 leading-relaxed">
                Get tailored suggestions to reduce energy consumption, optimize resource usage,
                and lower your software&apos;s carbon footprint.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-5">
                <span className="text-emerald-400 text-2xl">💰</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Cost Impact Estimates</h3>
              <p className="text-gray-400 leading-relaxed">
                See how much you could save on cloud costs by adopting greener architecture
                patterns and more efficient infrastructure.
              </p>
            </div>
          </div>

        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to a greener architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Upload Your Diagram</h3>
              <p className="text-gray-400 leading-relaxed">
                Drag and drop your architecture diagram as a PNG or JPG image.
                No account required to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">AI Analyzes It</h3>
              <p className="text-gray-400 leading-relaxed">
                Our AI examines your architecture, identifies components, and
                evaluates sustainability across multiple dimensions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Get Recommendations</h3>
              <p className="text-gray-400 leading-relaxed">
                Receive actionable, prioritized recommendations to make your
                architecture greener, cheaper, and more efficient.
              </p>
            </div>
          </div>

        </div>
      </section>
     <Footer />
    </main>
  )
}