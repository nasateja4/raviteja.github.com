import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ravi Teja Chevuri | Mechanical Design & Automation Engineer',
  description: 'Portfolio of Ravi Teja Chevuri - Mechanical Engineer specializing in SolidWorks parametric CAD, 3D printing prototyping, CNC automation, and electromechanical systems.',
  keywords: ['Mechanical Engineer', 'SolidWorks', 'CAD', '3D Printing', 'Robotics', 'CNC', 'Automation', 'FEA', 'ANSYS', 'Vercel'],
  authors: [{ name: 'Ravi Teja Chevuri' }],
  openGraph: {
    title: 'Ravi Teja Chevuri | Mechanical Design Engineer',
    description: 'Explore 3D CAD models, robotics prototypes, EV conversion, and automation projects.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-brand-500 selection:text-white">
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
