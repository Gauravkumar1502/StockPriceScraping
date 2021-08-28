const puppeteer=require('puppeteer');

const url="https://money.rediff.com/index.html";

async function getStockData(stock){

  const browser=await puppeteer.launch({headless:false});
  const page=await browser.newPage();

  await page.goto(url,{waitUntil:'networkidle2'});

  await page.setDefaultNavigationTimeout(0);
  await page.waitForSelector(".srchbar");
  await page.click("#srchword");
  await page.type("#srchword",stock,{delay:400});
  await page.keyboard.press('Enter');
  await page.waitForNavigation({
    waitUntil: 'networkidle2',
  });
  const StockData=await page.evaluate(()=>{
      let name=document.querySelector(".f14.bold.floatL").textContent;
      name=name.substring(0,name.indexOf("\n"));
      let time=document.querySelector("#tickertime_bse").textContent;
      let price=document.querySelector("#ltpid").textContent;
      let change=document.querySelector("#change").textContent;
      let changeInPercentage=document.querySelector("#ChangePercent").textContent;
      let volume=document.querySelector("#Volume").textContent;
      let previousClose=document.querySelector("#PrevClose").textContent;
      let dayHighLow=document.querySelector("#highlow").textContent;
      let yearHighLow=document.querySelector("#FiftyTwoHighlow").textContent;
      let marketCap=document.querySelector("#MarketCap").textContent;
      
      return {
          name,
          time,
          price,
          change,
          changeInPercentage,
          volume,
          previousClose,
          dayHighLow,
          yearHighLow,
          marketCap
        };
  });
  await browser.close();
  console.log(StockData);
  return StockData;
}

getStockData("TCS");