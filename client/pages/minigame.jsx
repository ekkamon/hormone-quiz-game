import { useState, useEffect } from 'react';
import { useIsUserLoggedIn } from '../hook/user';
import Router from 'next/router';
import cn from 'classnames';

const WinCount = 4;

export default function MiniGame({ socket }) {
  useIsUserLoggedIn();

  const [time, setTime] = useState(15);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(
    [
      { id: 1, state: '' },
      { id: 1, state: '' },
      { id: 2, state: '' },
      { id: 2, state: '' },
      { id: 3, state: '' },
      { id: 3, state: '' },
      { id: 4, state: '' },
      { id: 4, state: '' },
      { id: 5, state: '' },
    ].sort(() => Math.random() - 0.5)
  );
  const [prev, setPrev] = useState(-1);
  const [isPicking, setPicking] = useState(false);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);

  // check user is win or not
  useEffect(() => {
    if (time <= 0) {
      Router.push('battle');

      if (count != WinCount) {
        socket.emit('removeUserHp');
      }
    } else {
      if (count == WinCount) {
        setTimeout(() => {
          Router.push('battle');
        }, 800);
      }
    }
  }, [count, time]);

  const onChecking = (current) => {
    if (items[current].id == items[prev].id) {
      items[current].state = 'currect';
      items[prev].state = 'currect';
      setItems([...items]);
      setPrev(-1);
      setCount(count + 1);
      setTimeout(() => setPicking(false), 500);
    } else {
      items[current].state = 'wrong';
      items[prev].state = 'wrong';
      setItems([...items]);
      setTimeout(() => {
        items[current].state = '';
        items[prev].state = '';
        setItems([...items]);
        setPrev(-1);
        setPicking(false);
      }, 800);
    }
  };

  const clickSelect = (id) => {
    if (isPicking) return;
    if (items[id].state == 'currect') return;

    setPicking(true);

    if (prev == -1) {
      items[id].state = 'active';
      setItems([...items]);
      setPrev(id);
      setTimeout(() => setPicking(false), 500);
    } else {
      onChecking(id);
    }
  };

  return (
    <div className="p-4 text-white w-full">
      <div className="text-center mb-8 mt-4">
        <div>เหลือเวลา {time} วินาที</div>
        <small className="text-gray-500">
          จับคู่ตัวเลขสำเร็จ {count}/{WinCount} คู่
        </small>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => clickSelect(index)}
              className={cn(
                'card flex items-center justify-center h-32 bg-gray-700 p-1 rounded',
                value.state != '' ? `active ${value.state}` : ''
              )}
            >
              <div className="img text-3xl text-bold">{value.id}</div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-10 text-sm text-red-500">
        เราให้โอกาศคุณแก้ตัวโดยต้องจับคู่ตัวเลขให้ครบก่อน !
      </div>
    </div>
  );
}
