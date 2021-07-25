import { appSchema, tableSchema } from '@nozbe/watermelondb';

// eslint-disable-next-line import/prefer-default-export
export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'people',
      columns: [
        { name: 'name_title', type: 'string' },
        { name: 'name_first', type: 'string' },
        { name: 'name_last', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'picture_thumbnail', type: 'string' },
        { name: 'picture_large', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'location_city', type: 'string' },
        { name: 'location_state', type: 'string' },
        { name: 'location_country', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'cell', type: 'string' },
        { name: 'release_date_at', type: 'number' },
      ],
    }),
  ],
});
