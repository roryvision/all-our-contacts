import type { Metadata } from 'next';
import '../globals.css';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'All Our Contacts',
  description: 'Effortlessly download group contacts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='font-nohemi'>
        <div className='m-9'>
          <ToastContainer />
          {children}
        </div>
      </body>
    </html>
  )
}
