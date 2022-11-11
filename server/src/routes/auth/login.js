import { createUser, getUserDataFromName } from '../../storage/users';

export default function (req, res, next) {
  const sid = req?.body?.sid;
  const name = req?.body?.name;

  if (!name || !sid) {
    return res.status(400).json({
      status: 400,
      msg: 'ข้อมูลของคุณไม่เพียงพอ',
    });
  }

  if (getUserDataFromName(name)) {
    return res.status(400).json({
      status: 400,
      msg: 'ชื่อทีมที่คุณตั้งถูกใช้งานไปก่อนแล้ว',
    });
  }

  createUser(sid, name);

  return res.json({
    status: 200,
    msg: 'เข้าสู่ระบบสำเร็จแล้ว',
  });
}
