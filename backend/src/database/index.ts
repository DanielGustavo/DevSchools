import { createConnection } from 'typeorm';

import config from './ormconfig';

createConnection(config);
