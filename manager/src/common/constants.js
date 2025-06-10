
export const TITLE = "JK Boxed.com";
export const MANAGER_TITLE = "Video Manager";
export const HEADER_LINK = '#';

// "bogus db: vend static JSON from /assets/data
export const DATA_ENDPOINT = '/';

export const DEFAULT_COLLECTION = 'coffeehouse';
export const DEFAULT_ENSEMBLE = 'all';
export const DEFAULT_ID = 1000;

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


export const COLLECTIONS = [
  {
    url: '/assets/jkha.png',
    poster: '/assets/poster_halfgone.jpg',
    title: 'Halfway Gone',
    artist: 'jk & friends',
    date: 'Released May 1982',
    description: "Released on Vinyl, before it was retro chic!",
    collection: 'halfwaygone',
    width: '17%',
  },
  {
    url: '/assets/jkev.png',
    poster: '/assets/poster_jkeven.jpg',
    title: 'jk Even Numbered Decades',
    artist: 'jk',
    date: '1984-1996',
    description: "Misc live recordings and demos",
    collection: 'jk_even',
    width: '16%',
  },
  {
    url: '/assets/errand.png',
    poster: '/assets/poster_eb.jpg',
    title: 'Errand Boys for Rhythm',
    artist: 'Errand Boys for Ryhthm',
    date: '1996-1998',
    description: "jk & Bobby",
    collection: 'errand',
    width: '17%',
  },
  {
    url: '/assets/berk1.png',
    poster: '/assets/poster_bksq.jpg',
    title: 'Berkeley Square',
    artist: 'Berkeley Square',
    date: 'Released 1998',
    description: "jk, Brian, Brooke, and Gary",
    collection: 'bksq1',
    width: '17%',
  },
  {
    url: '/assets/berk2.png',
    poster: '/assets/poster_bksq2.jpg',
    title: 'A Nightingale Sang',
    artist: 'Berkeley Square',
    date: 'Released 2001',
    description: "Kurt, jk, Brian, Brooke, and Gary",
    collection: 'bksq2',
    width: '16%',
  },
  {
    url: '/assets/coffee.png',
    poster: '/assets/coffeehouse.jpg',
    title: 'The Coffeehouse',
    artist: 'jk & freinds',
    date: '2009-present',
    description: "Live performances from The Coffeehouse 'A' Studios",
    collection: 'coffeehouse',
    width: '16%',
  },
];

export const video_formats = ['mp4'];
export const audio_formats = ['mp3'];

export const isVideo = name => {
  let ret = false;
  if (name) {
    video_formats.forEach(n => {
      if (name.endsWith(n)) {ret = true};
    });
  }
  return ret;
};

export const isAudio = name => {
  let ret = false;
  if (name) {
    audio_formats.forEach(n => {
      if (name.endsWith(n)) {ret = true};
    });
  }
  return ret;
};

export const YouTubePrefix = 'YouTube:';
export const isYouTube = name => (name && name.startsWith(YouTubePrefix));

export const VimeoPrefix = 'Vimeo:';
export const isVimeo = name => (name && name.startsWith(VimeoPrefix));
