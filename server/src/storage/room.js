let room = {
  status: 'wating',
};

const getRoom = () => room;

const setRoom = (key, value) => {
  if (!room[key]) return;
  room[key] = value;
};

export { getRoom, setRoom };
