// Modules
import mongoose from 'mongoose';

// config
import config from '@/config';

const { database } = config;

export const dbConnection = () => {
  // console.log(`${database.client}://${database.connection.host}:${database.connection.port}/${database.connection.name}`, 'database connection');
  // mongoose
  //   .connect(`${database.client}://${database.connection.host}:${database.connection.port}/${database.connection.name}`)
  //   .then(() => {
  //     console.log('MongoDB connected.............');
  //   })
  //   .catch(err => console.log(`No connection`));
  return new Promise((resolve, reject) => {
    console.log('inside the database');
    mongoose.connect(`${database.client}://${database.connection.host}:${database.connection.port}/${database.connection.name}`, err => {
      if (err) {
        console.log('error in connecting to db in connect js');
        return reject(err);
      }
      resolve('1');
    });
  });
};
