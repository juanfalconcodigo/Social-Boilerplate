import Server from './server';
import connectDB from './environment/database';

const server=Server.instance;
connectDB();
server.listen();