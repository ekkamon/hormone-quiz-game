import 'dotenv/config';
import { createExpressApp, createSocketIOApp } from './create-app';
import { createServer } from 'http';
import routes from './routes';
import {
  onUserJoined,
  onUserDisconnect,
  onUserGetRoomData,
  onUserSetReady,
  onUserDead,
} from './game/room';
import { onAddUserScore, onRemoveUserHp, onGameOver } from './game/battle';

const app = createExpressApp();
const server = createServer(app);
const io = createSocketIOApp(server);

app.use('/', routes);

io.on('connection', (client) => {
  // join and exit
  client.on('joinGame', () => onUserJoined(io));
  client.on('disconnect', () => onUserDisconnect(io, client));

  // room
  client.on('getRoomData', () => onUserGetRoomData(client));
  client.on('setUserReady', () => onUserSetReady(io, client));

  // battle
  client.on('addUserScore', (score) => onAddUserScore(io, client, score));
  client.on('removeUserHp', () => onRemoveUserHp(client));
  client.on('setUserDead', () => onUserDead(client));
  client.on('gameOver', () => onGameOver(io));
});

server.listen(process.env.PORT, () => {
  console.log(`[Server] is running on ${process.env.HOST}:${process.env.PORT}`);
});

export { io };
