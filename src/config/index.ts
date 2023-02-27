import nconf from 'nconf';

const env = 'development';
const filePath = env === 'development' ? `src/config/config.${env}.json` : `dist/config/config.${env}.json`;
console.log(filePath, 'filelll');
nconf.argv().env().file({ file: filePath });

const config: Record<string, any> = {};
config.LOG_FORMAT = 'combined';
config.LOG_DIR = '../logs';
config.database = nconf.get('database').billTracker;

config.port = nconf.get('server').port;
config.env = env;

export default config;
