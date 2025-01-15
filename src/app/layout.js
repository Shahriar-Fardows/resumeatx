import './globals.css'

export const metadata = {
  title: 'ATS-Friendly Resume Maker',
  description: 'Create professional, ATS-friendly resumes easily',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}

