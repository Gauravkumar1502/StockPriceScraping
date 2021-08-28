const puppeteer=require('puppeteer');

const url="https://finance.yahoo.com/quote/%5Ensei/";

async function getStockData(stock){

  const browser=await puppeteer.launch({headless:true});
  const page=await browser.newPage();

  await page.goto(url,{waitUntil:'networkidle2'});

  await page.setDefaultNavigationTimeout(0);
  await page.waitForSelector("#yfin-usr-qry");
  await page.click("#yfin-usr-qry");
  await page.type("#yfin-usr-qry",stock,{delay:400});
  await page.keyboard.press('Enter');
  await page.waitForNavigation({
    waitUntil: 'networkidle2',
  });

  const StockData=await page.evaluate(()=>{
    var allData=document.querySelector("#quote-header-info").textContent.replace("Add to watchlist"," ");
    var stockName=allData.slice(0,allData.indexOf(')')+1);
    allData=allData.replace(stockName,"");

    var metaData=allData.slice(0,allData.indexOf('.')+1);
    allData=allData.replace(metaData,"").trim();

    var stockPrice;
    stockPrice=allData.slice(0,allData.indexOf('.')+3);
    return {stockName,metaData,stockPrice};
  });
  await browser.close();
  console.log(StockData);
  return StockData;
}

getStockData("Wipro");