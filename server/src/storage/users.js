let users = [];

const createUser = (sid, name) => {
  const userData = {
    sid,
    name,
    score: 0,
    hp: 3,
    isReady: false,
  };

  users = [...users, userData];
};

const getAllUsers = () => {
  return users;
};

const getUserDataFromName = (name) => {
  if (users.length == 0) return;
  return users.find((user) => user.name == name);
};

const getUserDataFromSid = (sid) => {
  if (users.length == 0) return;
  return users.find((user) => user.sid == sid);
};

const setUserVariable = (sid, key, value) => {
  if (users.length == 0) return;
  users.find((user, index) => {
    if (user.sid == sid) {
      users[index][key] = value;
    }
  });
};

const removeUser = (sid) => {
  if (users.length == 0) return;
  users = users.filter((user) => user.sid != sid);
};

const removeAllUser = () => {
  users = [];
};

export {
  createUser,
  getAllUsers,
  getUserDataFromName,
  getUserDataFromSid,
  setUserVariable,
  removeUser,
  removeAllUser,
};
