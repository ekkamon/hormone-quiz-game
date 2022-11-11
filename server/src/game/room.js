import { getRoom, setRoom } from '../storage/room';
import {
  getAllUsers,
  getUserDataFromSid,
  removeUser,
  setUserVariable,
} from '../storage/users';

const onUserJoined = (io) => {
  io.emit('updateUserList', getAllUsers());
};

const onUserDisconnect = (io, client) => {
  removeUser(client?.id);

  io.emit('updateUserList', getAllUsers());
};

const onUserGetRoomData = (client) => {
  client.emit('updateRoomData', getRoom());
};

const onUserSetReady = (io, client) => {
  const user = getUserDataFromSid(client.id);
  if (!user) return;

  const allUsers = getAllUsers();

  // set user status and trigger to client
  setUserVariable(client.id, 'isReady', !user.isReady);
  client.emit('setReadyStatus', user.isReady);
  io.emit('updateUserList', allUsers);

  // check all user is ready
  let isAllUserReady = true;

  allUsers.map((user) => {
    if (!user.isReady) {
      isAllUserReady = false;
    }
  });

  // start battle
  if (isAllUserReady && allUsers.length >= 2) {
    setRoom('status', 'playing');
    io.emit('startBattle');
  }
};

const onUserDead = (client) => {
  removeUser(client?.id);
};

import { io } from '../index';

let count = 0;

const mainThread = () => {
  const allUsers = getAllUsers();
  const room = getRoom();

  // check room is empty users
  if (allUsers.length == 0 && room.status != 'waiting') {
    // set room to default status
    setRoom('status', 'wating');
  }

  // console.log(
  //   `[${count++}][Room] status: ${room.status} | users: ${allUsers.length}`
  // );

  // check winner player
  if (allUsers.length <= 1 && room.status == 'playing') {
    const user = allUsers[0];

    io.to(user.sid).emit('setWinnerUser');
    removeUser(user.sid);
  }
};

setInterval(mainThread, 1000);

export {
  onUserJoined,
  onUserDisconnect,
  onUserGetRoomData,
  onUserSetReady,
  onUserDead,
};
