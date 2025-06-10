
export const VIDEOS = 'videos';
export const COLLECTIONS = "collections";
export const ENSEMBLES = 'ensembles';

const now = new Date();

export const initialValues = {
  "id":1000,
  "title":"",
  "description":"",
  "ensemble":"",
  "media":".mp4",
  "composer":"",
  "copyright":now.getFullYear(),
  "poster":".jpg",
  "recorded":now.toISOString().substring(0,10),
  "collection":""
};

export const saveVideo = (db, values) => {
  db
    .collection(VIDEOS)
    .insertOne(values)
    .then(window.alert('Saved: ' + values.title))
    .catch(console.error);
};

const atlsUrl = 'mongodb+srv://jkboxed:harr13tt@coffeehouse.m1458sz.mongodb.net/'
