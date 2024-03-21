
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https')

// Define the URL of the webpage to scrape
const url = 'https://merolagani.com/StockQuote.aspx';

const instance = axios.create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });
  
// Function to fetch and scrape data from the webpage
async function crawlData() {
    try {
        // Send an HTTP GET request to the URL
        const response = await instance.get(url);

        // Load the HTML content of the webpage using Cheerio
        const $ = cheerio.load(response.data);

        // Find the table containing the desired data using its class
        const table = $('.table-responsive');

        // Check if the table was found
        if (table.length) {
            // Extract data from the table rows
            const rows = table.find('tr');

            // Iterate over each row and extract relevant data
            rows.each((index, row) => {

                // Extract data from each column (adjust the column indexes as needed)
                const columns = $(row).find('td');
                if (columns.length >= 8) {  
                    const id = columns.eq(0).text().trim();
                    const symbol = columns.eq(1).text().trim();
                    const ltp = columns.eq(2).text().trim();
                    const percentChange = columns.eq(3).text().trim();
                    const high = columns.eq(4).text().trim();
                    const low = columns.eq(5).text().trim();
                    const open = columns.eq(6).text().trim();
                    const quantity = columns.eq(7).text().trim();
                    const turnover = columns.eq(8).text().trim();

                    // Print or process the extracted data as needed
                        console.log(`ID: ${id},
                        Symbol : ${symbol}, 
                        LTP: ${ltp}, 
                        %Change: ${percentChange},
                        High: ${high},
                        Low : ${low},
                        Open : ${open},
                        Quantity : ${quantity}
                        Turnover : ${turnover}`
                    );
                }
            });
        } else {
            console.log("Table not found on the webpage.");
        }
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
    }
}

crawlData();





















