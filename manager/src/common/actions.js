import {DATA_ENDPOINT} from './constants';

/* Planned to use serverless DB such as dynamo
   This should be easy to implement, but static vending of json is'
   cheaper in S3 and suitable for immediate use.
 */
export const FETCH_COLLECTION_REQUEST = 'FETCH_COLLECTION_REQUEST';
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';
export const FETCH_COLLECTION_FAILURE = 'FETCH_COLLECTION_FAILURE';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

const ACTION_TYPES = [FETCH_COLLECTION_REQUEST, FETCH_COLLECTION_SUCCESS, FETCH_COLLECTION_FAILURE];
const CREATE_ACTION_TYPES = [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE];


//   Uses REST-style actions and reducer but does simple static http GETs
// S3 static gets are http
const suffix = '.json';

export function fetchResource(resource, id, options = {}) {
  if (!resource) {
    throw new Error('Specify a resource');
  }
  const [ requestType, successType, failureType ] = ACTION_TYPES;

  // pass in an optional store resource name different from resource
  const resourceStoreName = options.storeName || resource;

  const customEndpoint = DATA_ENDPOINT;
  const encodedResource = resource.split('/').map(x => encodeURIComponent(x)).join('/');
  const resourceComponent = id ? encodedResource + '/' + encodeURIComponent(id) : encodedResource;
  let endpoint = `${customEndpoint}${resourceComponent}`;
  if (options.suffix !== false) {
    endpoint += suffix;
  }

  return dispatch => {
    dispatch({type: requestType, resource, id});

    const defaultHeaders = {
      'accept': 'application/json',
      'content-type': 'application/json',
      // Disable caching in IE
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'expires': 0
    };
    let headers = Object.assign({}, defaultHeaders, options.headers || {});
    const request = {cache: 'no-store', headers, method: 'GET'};

    return fetch(endpoint, request)
      .then(response => {
        const contentType = response.headers.get('content-type');
        const contentLength = response.headers.get('content-length');
        if (contentType && contentType.includes('application/json')) {
          return response.json().then(json => {
            if (response.ok) {
              return json;
            }
            return Promise.reject(json);
          });
        }
      })
      .then(successJson => {
        const ret = dispatch({type: successType, data: successJson, resource: resourceStoreName, id});
        if (options.onSuccess) {
          options.onSuccess(successJson);
        }
        return ret;
      })
      .catch(error => {
        if (options.onError) {
          options.onError(error);
        }
        return dispatch({type: failureType, resource: resourceStoreName, id});
      });
  }
}

export const isFetching = states => {
  if (states) {
    for (var state in states) {
      const s = states[state];
      if (!s || s.fetching) {
        return true;
      }
    }
  }
  return false;
};

export const getDataArray = state => {
  if (state && state.data) {
    return state.data;
  }
  return [];
};


export function createResource(resource, id, payload, options = {}) {
  console.log('createResource', resource);
  console.log('createResource body', payload);
  if (!resource) {
    throw new Error('Specify a resource');
  }
  const [ requestType, successType, failureType ] = CREATE_ACTION_TYPES;

  // pass in an optional store resource name different from resource
  const resourceStoreName = options.storeName || resource;

  const encodedResource = resource.split('/').map(x => encodeURIComponent(x)).join('/');
  const resourceComponent = id ? encodedResource + '/' + encodeURIComponent(id) : encodedResource;
  const endpoint = resourceComponent;

  return dispatch => {
    dispatch({type: requestType, resource, id});

    const defaultHeaders = {
      'accept': 'application/json',
      'content-type': 'application/json',
      // Disable caching in IE
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'expires': 0
    };
    let headers = Object.assign({}, defaultHeaders, options.headers || {});
    const request = {cache: 'no-store', headers, method: 'POST', body: JSON.stringify(payload)};

    return fetch(endpoint, request)
      .then(response => {
        const contentType = response.headers.get('content-type');
        const contentLength = response.headers.get('content-length');
        if (contentType && contentType.includes('application/json')) {
          return response.json().then(json => {
            if (response.ok) {
              return json;
            }
            return Promise.reject(json);
          });
        }
      })
      .then(successJson => {
        const ret = dispatch({type: successType, data: successJson, resource: resourceStoreName, id});
        if (options.onSuccess) {
          options.onSuccess(successJson);
        }
        return ret;
      })
      .catch(error => {
        if (options.onError) {
          options.onError(error);
        }
        return dispatch({type: failureType, resource: resourceStoreName, id});
      });
  }
}
