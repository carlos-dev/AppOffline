import { Q } from '@nozbe/watermelondb';

import { database } from './database';

const people = database.collections.get('people');

export const observePeople = () => people.query().observe();

export const savePeople = async ({
  nameTitle,
  nameFirst,
  nameLast,
  gender,
  pictureThumbnail,
  pictureLarge,
  email,
  locationCity,
  locationState,
  locationCountry,
  phone,
  cell,
}) => {
  await database.action(async () => {
    await people.create((entry) => {
      entry.nameTitle = nameTitle;
      entry.nameFirst = nameFirst;
      entry.nameLast = nameLast;
      entry.gender = gender;
      entry.pictureThumbnail = pictureThumbnail;
      entry.pictureLarge = pictureLarge;
      entry.email = email;
      entry.locationCity = locationCity;
      entry.locationState = locationState;
      entry.locationCountry = locationCountry;
      entry.phone = phone;
      entry.cell = cell;
    });
  });
};

/**
 * function that takes all data from the database and returns an array of data
 * @returns {Array}
 */
export const getPeople = async () => {
  const data = database.get('people');
  const peoples = await data.query().fetch();
  console.log('people', peoples);
  return peoples;
};

/**
 * function that takes specific data from the database and returns an array of data
 * @returns {Array}
 */
export const getPeopleUnique = async (id) => {
  const data = database.get('people');
  const peopleUnique = await data.query(
    Q.where('id', id),
  ).fetch();

  return peopleUnique;
};

/**
 * function that deletes an item from the database
 * @param {String}
 */
export const deletePeople = async (id) => {
  const data = database.get('people');

  const peopleUnique = await data.query(
    Q.where('id', id),
  ).fetch();

  await database.action(async () => {
    await peopleUnique[0].destroyPermanently();
  });
};

export const deleteAll = async () => {
  const data = database.get('people');
  const peoples = await data.query().fetch();
  console.log('people', peoples);

  await database.action(async () => {
    peoples.forEach(async (item) => {
      await item.destroyPermanently();
    });
  });
};
