/* eslint-disable import/prefer-default-export */
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { mySchema } from '../models/schema';
import { dbModels } from '../models';

const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: dbModels,
  actionsEnabled: true,
});
