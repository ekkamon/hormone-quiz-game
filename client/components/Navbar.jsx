import Link from 'next/link';
import Image from 'next/image';
import LogoApp from '../assets/images/logo.svg';

export default function Navbar() {
  return (
    <nav className='bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5'>
      <div className='grid place-items-center'>
        <div className='flex items-center'>
          <Image src={LogoApp} alt='navbar-logo' layout='fixed' />
          <Link href='/'>
            <span className='ml-3 self-center text-xl font-bold whitespace-nowrap text-gray-100'>
              Hormone Quiz
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
