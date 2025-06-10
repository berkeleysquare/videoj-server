
//   Uses REST-style actions and reducer but does simple static http GGTs
// S3 static gets are http
const method = 'GET';
const suffix = '.json';
// export const KINDLE_CLOUD_READER_URL = 'https://read.amazon.com/kindle-library/search?query=&libraryType=BOOKS&sortType=acquisition_desc';
export const DATA_ENDPOINT = './books/';

const indexItems = (items) => {
  return (items || []).map((item, index) => {
    return {...item, index, author: (item.authors || [])[0] || '' };
  });
};


export const fetchBooks = (resource, f) => {

  const customEndpoint = DATA_ENDPOINT;
  const endpoint = `${customEndpoint}${resource}${suffix}`;

 const defaultHeaders = {
   'accept': 'application/json',
   'content-type': 'application/json',
   // Disable caching in IE
   'cache-control': 'no-cache',
   'pragma': 'no-cache',
   'expires': 0
 };
 let headers = Object.assign({}, defaultHeaders || {});
 const request = {cache: 'no-store', headers, method};

  fetch(endpoint, request)
  .then(response => {
      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');
      if (contentType && contentType.includes('application/json')) {
        return response.json().then(json => {
          if (response.ok) {
            f(indexItems(json.itemsList));    
            return json.itemsList;          
          }
          return Promise.reject(json);
        });
      }
    })
}
