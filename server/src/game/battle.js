import { getRoom, setRoom } from '../storage/room';
import {
  getAllUsers,
  getUserDataFromSid,
  removeAllUser,
  setUserVariable,
} from '../storage/users';

const onAddUserScore = (io, client, score) => {
  const user = getUserDataFromSid(client.id);
  if (!user) return;
  if (!score || typeof score != 'number' || score < 0) return;

  const newScore = user.score + score;
  setUserVariable(user.sid, 'score', newScore);

  client.emit('updateUserScore', newScore);
  io.emit('updateUserList', getAllUsers());
};

const onRemoveUserHp = (client) => {
  const user = getUserDataFromSid(client.id);
  if (!user) return;

  let newHP = user.hp;

  if (user.hp > 0) {
    newHP--;
    setUserVariable(user.sid, 'hp', newHP);
  }

  client.emit('updateUserHP', newHP);
};

const onGameOver = (io) => {
  io.emit('gameOver');
  removeAllUser();
  setRoom('status', 'wating');
};

export { onAddUserScore, onRemoveUserHp, onGameOver };
