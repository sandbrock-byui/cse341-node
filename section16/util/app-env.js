const getCorsOptions = () => {
  return {
    origin: 'https://br-cse341-node.herokuapp.com/',
    optionsSuccessStatus: 200
  };
};

const getMongoDbOptions = () => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
};

const getMongoDbUrl = () => {
  return process.env.MONGODB_URL;
};

const getSendGridKey = () => {
  return process.env.SENDGRID_KEY;
};

const getServerPort = () => {
  return process.env.PORT || 3000;
};

module.exports = {
  getCorsOptions,
  getMongoDbOptions,
  getMongoDbUrl,
  getSendGridKey,
  getServerPort
};
