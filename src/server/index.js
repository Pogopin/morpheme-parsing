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
const url = 'https://udarenieru.ru/index.php?word=on&morph_word=%D0%BB%D0%BE%D0%BF%D0%B0%D1%82%D0%B0';

app.listen(port, () => {
    console.log(`Start app on ${port}`)
})  
app.get('/w', async(req, res) => {
  try {
    const fullData = await fetchUdarenie();     
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешает запросы со всех доменов
    res.setHeader('Access-Control-Allow-Methods', 'GET'); // Разрешает методы
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Разрешает заголовки
    //res.setHeader('Access-Control-Allow-Credentials', true); // Разрешает cookies и другие учетные данные

    res.send(fullData);
  } catch (err) {
      res.status(500);
      res.send(err);
  } 
});

let word = "закипело";
let encodedWord = encodeURIComponent(word);
console.log('код слова: ', encodedWord)

const fetchUdarenie = async() => {
  let html = null;
  try {     
    const res = await axios.get(url)    
    html = res.data;      
  } catch (error){    
      console.log(error)    
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;

//   const firstChunk = document.querySelector('#kuz_interpret').querySelector('tbody > tr > td').innerHTML
//   const endTableTagPosition = firstChunk.indexOf('<table>')
//   const usefulData = firstChunk.slice(0, endTableTagPosition)//удаление последней таблицы

  const content = document.querySelector('#content');
  const tableRows = document.querySelectorAll('table')[1].querySelectorAll('tbody > tr');  

  const tableData = Array.from(tableRows).map((el) => {    
    return el.textContent
  })
  const data = {
    content: content.innerHTML,
    tableData: tableData
  }
  return JSON.stringify(data)
}

// fetchUdarenie()