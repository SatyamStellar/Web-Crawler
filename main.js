const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {

  if (process.argv.length < 3) {
    console.log("No website provided. Usage: node main.js <URL>");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments. Usage: node main.js <URL>");
    process.exit(1);
  }

  const baseURL = process.argv[2];


  try {
    new URL(baseURL);
  } catch (error) {
    console.log(`Invalid URL: ${baseURL}. Please provide a valid URL (e.g., https://example.com)`);
    process.exit(1);
  }

  console.log(`Starting crawl of ${baseURL}`);

  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main().catch((error) => {
  console.error("An error occurred:", error.message);
  process.exit(1);
});
