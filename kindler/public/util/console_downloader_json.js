/* ALL THE GOOD STUFF STOLEN FROM @usayamadx
https://gist.github.com/usayamadx/9c638d9b70bc714d6dd6043fcd54085f 

This is a snippet to download your Kindle Cloud Reader books as JSON or CSV.
1. Open Kindle Cloud Reader https://read.amazon.com/
2. Open Developer Tools (F12) 
3. set output_format to 'json' or 'csv'
3. Copy and paste this snippet to Console and run
**/

// csv output is default
// copy below this line

const output_format = 'json';

// init
let xhr = new XMLHttpRequest()
let domain = 'https://read.amazon.com/'
let items = []
let csvData = ""

const formatBook = item => '"' + item.asin + '","' + item.title + '","' + (item.authors || [])[0] + '"\n';

// function
function getItemsList(paginationToken = null) {
  let url = domain + 'kindle-library/search?query=&libraryType=BOOKS' + ( paginationToken ? '&paginationToken=' + paginationToken : '' ) + '&sortType=recency&querySize=50'
  xhr.open('GET', url, false)
  xhr.send()  
}

// request result
xhr.onreadystatechange = function() {
  switch ( xhr.readyState ) {
    case 0:
      console.log('uninitialized')
      break
    case 1:
      console.log('loading...')
      break
    case 4:
      if(xhr.status == 200) {
        let data = xhr.responseText
        data = JSON.parse(data)
        if(data.itemsList) {
          items.push(...data.itemsList)
        }
        if(data.paginationToken) {
          getItemsList(data.paginationToken)
        }
      } else {
        console.log('Failed')
      }
      break
  }
}

// action
getItemsList()

let blobURL = null;
if (output_format === 'json') {
  const jsonObj = {itemsList: items}
  const blobJSON = new Blob([JSON.stringify(jsonObj)], {type: 'text/plain;charset=utf-8'});
  blobURL = URL.createObjectURL(blobJSON);  
} else {
  // to csv
  items.forEach(item => {
    csvData += formatBook(item);
  })
  const blobCSV = new Blob([csvData], {type: 'text/plain;charset=utf-8'});
  blobURL = URL.createObjectURL(blobCSV);
  }

window.location = blobURL;
