import { useIsUserLoggedIn, useUser } from '../hook/user';

import Loading from '../components/Loading';

import { MdTipsAndUpdates, MdStars } from 'react-icons/md';

export default function Conclusion() {
  useIsUserLoggedIn();

  const user = useUser();

  if (!user || !user.isLogin) {
    return <Loading />;
  }

  return (
    <div className='p-4 text-white'>
      <div className='mb-3 p-5 block bg-gray-700 rounded'>
        <div className='flex items-center'>
          <MdTipsAndUpdates className='h-5 w-5 mr-2' />
          {user.name}
        </div>
      </div>
      <div className='mb-3 p-5 block bg-gray-700 rounded'>
        <div className='flex items-center'>
          <MdStars className='h-5 w-5 mr-2' />
          คะแนนสะสม {user.score} แต้ม
        </div>
      </div>
      <div className='mt-3 grid place-items-center'>
        <button
          onClick={() => location.reload()}
          className='block bg-blue-700 p-2 pl-4 pr-4 text-sm rounded'
        >
          เล่นอีกครั้ง
        </button>
      </div>
    </div>
  );
}
