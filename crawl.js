const { JSDOM } = require("jsdom");

async function crawlPage(currentURL){
 console.log(`actively crawling:${currentURL}`) 

  try {
    
  const resp = await fetch(currentURL)
  console.log(await resp.text())

  } catch (error) {
   console.log(`error in fetch ${error.message} on current page ${currentURL}`) 
  }
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
