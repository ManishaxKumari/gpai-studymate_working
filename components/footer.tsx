"use client"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GP</span>
              </div>
              <span className="font-bold">GPAI StudyMate</span>
            </div>
            <p className="text-sm opacity-75">Your AI-powered study companion</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>© 2025 GPAI StudyMate. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:opacity-100 transition">
              Twitter
            </a>
            <a href="#" className="hover:opacity-100 transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
