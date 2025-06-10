import React from 'react';  

const HTML_HEADER = '<!DOCTYPE html><html><head><style>' +
'body {margin: 80px;}' +
'.songTitle {font-size: 1.1em; font-weight: bold;}' +
'.songComposer {font-size: 0.9em;}' +
'.songNum {color: grey}' +
'</style></head><body class="body">';

export const formatList = (listObject, setListTitle) => {
    const ret = [HTML_HEADER];
    ret.push('<h3>' + setListTitle + '</h3>');
    ret.push('<p>' + (new Date).toLocaleDateString() + '</p>');
    ret.push('<table cellspacing="10"><tbody');
    listObject.forEach((s,i) => {
      ret.push(
        '<tr><td class="songNum">' + (i+1) + '</td>' +
        '<td class="songTitle">' + s.title + '</td>' + 
        '<td class="songComposer">' + s.composer + '</td>' + 
        '<td class="songComposer">©' + s.copyright + '</td></tr>');
    });
    return ret.join('\n') + '</tbody></table></body></html>';
  }
  