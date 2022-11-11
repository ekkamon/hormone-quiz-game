import { CgSpinnerTwo } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className='grid place-items-center h-screen'>
      <CgSpinnerTwo className='text-gray-200 h-10 w-10 spinner' />
    </div>
  );
}
