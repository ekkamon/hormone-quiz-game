import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useIsUserLoggedIn, useUser } from '../hook/user';
import tw from 'tailwind-styled-components';
import {
  MdCheckCircle,
  MdOutlineClear,
  MdOutlineViewInAr,
  MdGppGood,
  MdGppBad,
} from 'react-icons/md';
import Loading from '../components/Loading';

const Button = tw.button`
  flex
  text-white
  p-2
  rounded
  text-sm
  w-full
  ${(props) => (!props.ready == 1 ? 'bg-gray-700' : 'bg-blue-700')}
  shadow-light
  w-26
`;

const UserProfile = ({ data }) => {
  const { name, isReady } = data;
  return (
    <div className='block p-4 w-full bg-gray-700 rounded'>
      <div className='flex items-center text-white'>
        {!isReady ? (
          <MdGppBad className='text-gray-400 h-5 w-5 mr-1' />
        ) : (
          <MdGppGood className='text-blue-300 h-5 w-5 mr-1' />
        )}
        <div>{name}</div>
      </div>
    </div>
  );
};

export default function Lobby({ socket }) {
  useIsUserLoggedIn();

  const user = useUser();
  const [users, setUsers] = useState([]);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    socket.emit('joinGame');
  }, []);

  if (!user || user.isLogin == false) {
    return <Loading />;
  }

  const clickReady = (e) => {
    e.preventDefault();
    socket.emit('setUserReady');
  };

  socket.on('updateUserList', (data) => {
    if (!Array.isArray(data)) return;
    setUsers(data);
  });

  socket.on('setReadyStatus', (status) => setReady(status));

  socket.on('startBattle', () => {
    Router.push('battle');
  });

  return (
    <>
      <div className='p-4 text-white'>
        <div className='grid grid-cols-2 gap-2'>
          {users.map((user, index) => {
            return <UserProfile key={index} data={user} />;
          })}
        </div>
      </div>
      <div className='fixed block bottom-0 text-white bg-gray-800 p-3 h-16 w-full'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='mt-2.5 flex items-center'>
            <MdOutlineViewInAr className='h-5 w-5 mr-1' />
            {user?.name.toUpperCase()}
          </div>
          <div className='grid justify-items-end'>
            <Button onClick={clickReady} ready={isReady ? 1 : 0}>
              {!isReady ? (
                <MdOutlineClear className='h-5 w-5 mr-1' />
              ) : (
                <MdCheckCircle className='h-5 w-5 mr-1' />
              )}
              {!isReady ? 'ยังไม่พร้อม' : 'พร้อมแล้ว'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
