import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import parser from 'url';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 30000,
};

const RETRY_BASE = 5;

function mask(url: string, maskUsername = false) {
  try {
    const MASK = '******';
    const urlObject = parser.parse(url);
    if (!urlObject.auth) return url;
    const idx = urlObject.auth.indexOf(':');
    if (idx !== -1) {
      urlObject.auth = maskUsername
        ? `${MASK}:${MASK}`
        : `${urlObject.auth.substr(0, idx)}:${MASK}`;
    }
    return parser.format(urlObject);
  } catch (e: any) {
    return `(${e.message})`;
  }
}

const { CONNECTION_STRING: uri, SCHEMA: schema } = process.env;

if (!uri) throw Error('CONNECTION_STRING environment variable must be provided');
if (!schema) throw Error('SCHEMA environment variable must be provided');

const client: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export class MongoService {
  retryTime = RETRY_BASE;
  inRetry = false;
  logger = {
    log: (msg: string) => console.log(`INFO: ${msg}`),
    warn: (msg: string) => console.log(`WARN: ${msg}`),
    error: (msg: string, err: any = '') => console.log(`ERROR: ${msg}`, err)
  }

  constructor() {
    this.connect();
  }

  reconnect() {
    if (!this.inRetry) {
      this.inRetry = true;
      this.logger.warn(
        `Retrying connection after ${this.retryTime} seconds...`
      );
      setTimeout(() => {
        this.inRetry = false;
        this.connect();
      }, 1000 * this.retryTime);
      this.retryTime = Math.min(this.retryTime + RETRY_BASE, 60);
    }
  }

  collection(col: string) {
    return client
      .db(schema)
      .collection(col);
  }

  connect() {
    if (!uri) throw Error('CONNECTION_STRING environment variable must be provided');
    if (!schema) throw Error('SCHEMA environment variable must be provided');

    client
      .connect()
      .then(() => {
        this.logger.log('Connected to database!');
        this.retryTime = RETRY_BASE;
      })
      .catch((err: any) => {
        this.logger.error('Connection failed!', err);
      });

    client.on('error', (e) => {
      this.logger.error(`mongodb error ${e}`);
      this.reconnect();
    });

    client.on('connected', () => {
      this.logger.log(`Connected to database !: ${mask(uri)}`);
    });

    client.on('disconnecting', () => {
      this.logger.log('database is disconnecting!!!');
    });

    client.on('disconnected', () => {
      this.logger.warn('database is disconnected!!!');
      this.reconnect();
    });

    client.on('reconnected', () => {
      this.logger.log(`mongodb is reconnected: ${mask(uri)}`);
    });

    client.on('timeout', () => {
      this.logger.warn(`mongodb timeout`);
    });

    client.on('close', () => {
      this.logger.warn('mongodb connection closed');
    });
  }

  isOk() {
    return true;
  }
}
