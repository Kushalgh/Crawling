# NEPSE & MeroLagani Stock Data Web Crawlers

This project contains two separate web crawlers built using Node.js, Axios, and Cheerio. The crawlers are designed to fetch stock market data from the Nepal Stock Exchange (NEPSE) and MeroLagani websites. The crawlers extract relevant data from HTML tables on these sites and print it to the console for further processing or storage.


## Installation

Clone the repository:

```bash
git clone https://github.com/Kushalgh/crawling.git
cd crawling
```


Install the dependencies:
```bash

npm install
```

## Usage
NEPSE Stock Data Crawler
This crawler fetches stock data from the NEPSE "Today Price" page.


Run the NEPSE crawler:
```bash
node crawl_nepse.js
```

## Output:

The crawler prints the extracted stock data to the console, including information such as symbol, close price, open price, high price, low price, traded quantity, traded value, total trades, and market capitalization.

MeroLagani Stock Data Crawler
This crawler fetches stock data from the MeroLagani Stock Quote page.

Run the MeroLagani crawler:

```bash
node merolagani.js
```

## Output:

The crawler prints the extracted stock data to the console, including information such as symbol, last traded price (LTP), percentage change, high price, low price, open price, quantity, and turnover.

## Error Handling

Retry Mechanism: The NEPSE crawler includes a retry mechanism to handle socket hang-up errors. If a request fails due to connection issues, the crawler retries up to three times before giving up.
SSL Certificate Validation: Both crawlers use a custom HTTPS agent with rejectUnauthorized: false to ignore SSL certificate validation errors, which is useful for dealing with sites that have self-signed or invalid certificates.

## Contributing
Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request with your changes.

