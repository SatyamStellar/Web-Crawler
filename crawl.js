const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages){


  const baseURLObj = new URL(baseURL);
  const currenURLObj = new URL(currentURL);

  if(baseURLObj.hostname !== currenURLObj.hostname){
    return pages
  }

  const normalizeCurrenURL = normalizeURL(currentURL)

  if(pages[normalizeCurrenURL]>0){
    pages[normalizeCurrenURL]++
    return pages
  }
    pages[normalizeCurrenURL] = 1;
  try {
    
  const resp = await fetch(currentURL)

  if(resp.status > 399){
      console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
      return pages
    } 
    const contentType = resp.headers.get("content-type")
    if(!contentType.includes("text/html")){
      console.log(`no html content ${contentType} on  page ${currentURL}`)
      return pages
    }
    
  
  const htmlBody = await resp.text()

  const  nextURLs = getURLsFromHTML(htmlBody, baseURL)

  for (const nextURL of nextURLs){
    pages = await crawlPage(baseURL, nextURL, pages)
  }
  
 console.log(`actively crawling:${currentURL}`) 

  } catch (error) {
   console.log(`error in fetch ${error.message} on current page ${currentURL}`) 
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
      if(linkElement.href.slice(0, 1)==='/'){
      // relative
     try{
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
      urls.push(urlObj.href)

      }catch(err){
        console.log(`err with relative url: ${err.message}`)
      } 
          }else{
      // absolute
    try{
        const urlObj = new URL(linkElement.href)
      urls.push(urlObj.href)

      }catch(err){
        console.log(`err with relative url: ${err.message}`)
      }  
    }

 }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
