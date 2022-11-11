import { TbFidgetSpinner } from 'react-icons/tb';

export default function Loading() {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='text-white'>
        <div className='flex place-content-center'>
          <TbFidgetSpinner className='text-gray-200 h-10 w-10 spinner mb-5' />
        </div>
        <div>ขณะนี้เกมได้เริ่มไปแล้วกรุณารอรอบต่อไป...</div>
      </div>
    </div>
  );
}
