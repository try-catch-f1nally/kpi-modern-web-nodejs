import * as http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end('If you see this message, then all is working correctly :)');
  })
  .listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
  });
