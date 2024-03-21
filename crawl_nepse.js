const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const customAgent = new https.Agent({
  rejectUnauthorized: false, // Ignore SSL certificate validation errors
  keepAlive: true, // Keep the connection alive for re-use
});

const instance = axios.create({
  httpsAgent: customAgent,
  //timeout: 30000, // Increased timeout to 30 seconds
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function fetchData() {
  const url = 'https://www.nepalstock.com/today-price';
  const maxRetries = 3; // Maximum number of retry attempts
  let retryCount = 0;

  while(retryCount < maxRetries){
  
  try {
    const response = await instance.get(url);
    const $ = cheerio.load(response.data);

    // Select the table containing the data
    const table = $('.table');

    //.table .table_lg .table-stripped .table__border .table__border--bottom

    if (table.length) {
      // Extract data from the table rows
      const tableRows = table.find('tr');

      // Iterate over each row in the table
      tableRows.each((index, row) => {
        const columns = $(row).find('td');

        // Extract data from each column
        const symbol = $(columns[1]).text().trim();
        const closePrice = $(columns[2]).text().trim();
        const openPrice = $(columns[3]).text().trim();
        const highPrice = $(columns[4]).text().trim();
        const lowPrice = $(columns[5]).text().trim();
        const tradedQuantity = $(columns[6]).text().trim();
        const tradedValue = $(columns[7]).text().trim();
        const totalTrades = $(columns[8]).text().trim();
        const ltp = $(columns[9]).text().trim();
        const prevClosePrice = $(columns[10]).text().trim();
        const avgTradedPrice = $(columns[11]).text().trim();
        const fiftyTwoWeekHigh = $(columns[12]).text().trim();
        const fiftyTwoWeekLow = $(columns[13]).text().trim();
        const marketCapitalization = $(columns[14]).text().trim();

        // Log or process the extracted data as needed
        console.log(`
        SN: ${index + 1},
        Symbol: ${symbol},
        ClosePrice: ${closePrice},
        OpenPrice: ${openPrice},
        HighPrice: ${highPrice},
        LowPrice: ${lowPrice},
        TotalTradedQuantity: ${tradedQuantity},
        TotalTradedValue: ${tradedValue},
        TotalTrades: ${totalTrades},
        LTP: ${ltp},
        PreviousDayClosePrice: ${prevClosePrice},
        AverageTradedPrice: ${avgTradedPrice},
        FiftyTwoWeekHigh: ${fiftyTwoWeekHigh},
        FiftyTwoWeekLow: ${fiftyTwoWeekLow},
        MarketCapitalization: ${marketCapitalization},
      `);  
      });
    } else {
      console.log('Table not found.');
    }
  } catch (error) {
    if (error.code === 'ECONNRESET' || error.code === 'ECONNABORTED') {
      // Handle socket hang up error: retry the request after a delay
      console.error('Socket hang up error. Retrying request...');
      retryCount++;
      await delay(1000); 
    } else {
      // Log other errors and break the loop
      console.error('Error fetching data:', error);
      break;
    }
  }
  }
  if (retryCount === maxRetries) {
    console.error('Maximum retry attempts reached. Request failed.');
  }
}

fetchData();
