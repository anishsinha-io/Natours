const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  process.exit(1);
});

dotenv.config({ path: `./config.env` });

const app = require(`./app.js`);

const currentTime = new Date();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `Database connection successful as of ${currentTime.toLocaleString()}`
    );
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log(
    '--------------------------------\nSIGTERM RECEIVED. Shutting down gracefully.\n--------------------------------'
  );
  server.close(() => {
    console.log(
      '--------------------------------\nProcess terminated\n--------------------------------'
    );
  });
});
