import express from 'express';
const app = express();
const port = 3000;
// app.use(cors({
//   origin: ['domain'],
//   method: ["GET"],
//   credentials: true
// }))

import axios from 'axios';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const url = 'https://udarenieru.ru/index.php?word=on&morph_word=';
app.use(express.text());
app.listen(port, () => {
    console.log(`Start app on ${port}`)
})  
app.post('/w', async(req, res) => {
  try {
    const requestBody = req.body;
    console.log(requestBody);
    const fullData = await fetchUdarenie(requestBody);     
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешает запросы со всех доменов
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Разрешает методы
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Разрешает заголовки
    //res.setHeader('Access-Control-Allow-Credentials', true); // Разрешает cookies и другие учетные данные
    
    res.send(fullData);
  } catch (err) {
      res.status(500);
      res.send(err);
  } 
});

const fetchUdarenie = async(wordCode) => {
  let html = null;
  try {     
    const res = await axios.get(url + `${wordCode}`)     
    // const res = await axios.get(url + '%D0%BB%D0%BE%D0%B4%D0%BA%D0%B0')
    html = res.data;      
  } catch (error){    
      console.log(error)    
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;  
  
  if(document.querySelector('#kuz_interpret') !== null) {  
  
    const firstChunk = document.querySelector('#kuz_interpret').querySelector('tbody > tr > td').innerHTML;
    const endChunkPosition = firstChunk.indexOf('<h3');
    const usefulData = firstChunk.slice(0, endChunkPosition - 3);

    const content = document.querySelector('#content');
    const tableRows = document.querySelectorAll('table')[1].querySelectorAll('tbody > tr');  
  
    const tableData = Array.from(tableRows).map((el) => {    
      return el.textContent;
    })
    const data = {
      wordInformation: usefulData,
      content: content.innerHTML,
      tableData: tableData
    }
    console.log(data)
    return JSON.stringify(data)
  } else {
      console.log('Такого слова нет в словаре');
      return {}
  }

}

// fetchUdarenie()
