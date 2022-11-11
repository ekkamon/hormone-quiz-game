import axios from '../axios.config';
import Router from 'next/router';
import tw from 'tailwind-styled-components';
import Loading from '../components/Loading';
import {
  MdHighlightOff,
  MdCheckCircleOutline,
  MdOutlineViewInAr,
  MdWaterDrop,
} from 'react-icons/md';

import { useEffect, useState } from 'react';
import { useIsUserLoggedIn, useUser } from '../hook/user';
import { useTimer } from '../hook/timer';
import { useSelector } from 'react-redux';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const removeQuiz = (quiz, quizId) => {
  return quiz.filter((value) => value.id != quizId);
};

const AnswerCard = tw.div`
  lg:text-center
  text-start
  cursor-pointer
  ${(props) =>
    props.disabled
      ? 'bg-gray-800'
      : 'bg-gray-700 hover:bg-blue-500 hover:text-white'}
  block
  p-4
  lg:pt-10
  lg:pb-10
  text-gray-100
  w-full
  rounded
`;

export default function Battle({ socket, quiz }) {
  useIsUserLoggedIn();

  const user = useUser();
  const timer = useTimer();

  const [quizRemaining, setQuizRemaining] = useState(quiz);
  const [thisQuiz, setThisQuiz] = useState(null);
  const [solve, setSolve] = useState(null);
  const [go, setGo] = useState(false);

  // timer
  const time = useSelector((state) => state.timerData.value);

  const goNext = () => setGo(go + 1);

  // start
  useEffect(() => goNext(), []);

  // start timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        timer.delTimer();
      } else {
        socket.emit('setUserDead');
        Router.push('conclusion');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // random quiz
  useEffect(() => {
    const randomId = randomNumber(0, quizRemaining.length);

    setThisQuiz(quizRemaining[randomId]);

    if (quizRemaining.length == 0) {
      socket.emit('gameOver');
      Router.push('conclusion');
    }
  }, [go]);

  useEffect(() => {
    if (!solve) return;

    setTimeout(() => {
      const isCurrect = solve?.currect;

      setSolve(null);
      if (!isCurrect) {
        Router.push('minigame');
      }
      goNext();
    }, 3000);
  }, [solve]);

  // check is hp empty
  useEffect(() => {
    if (user.hp <= 0) {
      socket.emit('setUserDead');
      Router.push('conclusion');
    }
  }, [user.hp]);

  if (!user || !user.isLogin || !thisQuiz) {
    return <Loading />;
  }

  socket.on('updateUserScore', (score) => user.setUserScore(score));

  socket.on('updateUserHP', (hp) => user.setUserHP(hp));

  socket.on('setWinnerUser', () => Router.push('conclusion'));

  socket.on('gameOver', () => {
    socket.emit('setUserDead');
    Router.push('conclusion');
  });

  // click solving
  const clickAnswer = (quizId, answer) => {
    if (solve) return;

    const currect = thisQuiz.answer == answer;

    if (currect) {
      socket.emit('addUserScore', thisQuiz.score);
    }

    setQuizRemaining(removeQuiz(quizRemaining, quizId));

    setSolve({
      currect,
      answer: thisQuiz.answer,
    });
  };

  // timer format
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  };

  return (
    <>
      <div className='p-4 grid place-items-center'>
        <div className='lg:w-10/12 md:w-full sm:w-4/5 w-full'>
          <div className='text-center w-full'>
            <div className='grid grid-cols-2 gap-2 text-gray-400 text-xs'>
              <div className='text-start'>เวลา {formatTime(time)}</div>
              <div className='text-end'>คะแนน: {user.score}</div>
            </div>
            <div className='lg:mt-32 lg:mb-32 mt-24 mb-24'>
              <div className='text-gray-500 mb-3'>
                (+{thisQuiz.score} คะแนน)
              </div>
              <h5 className='text-white lg:text-3xl text-xl'>
                {thisQuiz.question}
              </h5>
            </div>
            <div className='grid justify-items-center'>
              <div className='w-full grid lg:grid-cols-2 lg:gap-2 grid-cols-1 gap-2'>
                {thisQuiz.choice.map((answer, i) => {
                  return (
                    <AnswerCard
                      key={i}
                      onClick={() => clickAnswer(thisQuiz.id, answer)}
                      disabled={solve ? true : false}
                    >
                      {i + 1}. {answer}
                    </AnswerCard>
                  );
                })}
              </div>
              {solve?.currect == true ? (
                <>
                  <div className='mt-5 text-white text-green-500 flex items-center'>
                    <MdCheckCircleOutline className='h-5 w-5 mt-0.5 mr-1' />{' '}
                    <div>คุณต้องคำถามถูกต้องแล้ว</div>
                  </div>
                  <small className='mt-2 text-green-400'>{solve.answer}</small>
                </>
              ) : solve?.currect == false ? (
                <>
                  <div className='mt-5 text-white text-red-500 flex items-center'>
                    <MdHighlightOff className='h-5 w-5 mt-0.5 mr-1' />{' '}
                    <div>คุณตอบโจทย์ข้อนี้ไม่ถูกต้อง</div>
                  </div>
                  <small className='mt-2 text-red-400'>
                    เฉลย | {solve.answer}
                  </small>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='fixed block bottom-0 text-white bg-gray-800 p-3 h-16 w-full'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='mt-2.5 flex items-center'>
            <MdOutlineViewInAr className='h-5 w-5 mr-1' />
            {user?.name.toUpperCase()}
          </div>
          <div className='mt-2.5 grid justify-items-end'>
            <div className='flex items-center text-white'>
              {[...new Array(user.hp)].map((_, index) => (
                <MdWaterDrop key={index} className='h-5 w-5 mr-1' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get('/data/question');

  return {
    props: {
      quiz: data,
    },
  };
};
