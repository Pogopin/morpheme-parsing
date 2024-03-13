// import './assets/css/style.css';
import { toast, contentResult, inputValue, btn, word } from './constants';
type Data = {
    wordInformation: string;
    content: string;
    tableData: []
}
const russianLetters: RegExp = /^[а-яА-ЯёЁ]+$/;
inputValue.addEventListener('input', (event) => {    
    let userInput = (event.target as HTMLInputElement).value;

    if(!russianLetters.test(userInput)) {
        toast.show();
    }
})
btn.addEventListener('click', () => {
    if(russianLetters.test(inputValue.value)) {        
        getData(inputValue.value);
    } else { toast.show(); }    
});
const getData = async (value: string) => {
    const response = await fetch('morpheme-parsing.vercel.app/search', {
        method: "POST",
        body: encodeURIComponent(value)
    })
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data:Data = await response.json();
    let template: string;
    // console.log(data)
    if(!checkObject(data)) {
        if (contentResult) {
            template = data.content;
            word.innerHTML = data.wordInformation;
            contentResult.innerHTML = template;
            Array.from(data.tableData).forEach(el => {
                const spanNodeElement = document.createElement('span');
                spanNodeElement.classList.add('part');
                spanNodeElement.innerText = el;  
                contentResult.append(spanNodeElement);
            })
        }
    } else {
        if (contentResult) {
            template = '<span class="error">такого слова нет в словарях</span>'
            contentResult.innerHTML = template;
        }
    }    
}
const checkObject = (obj: Object): boolean => {
    return Object.keys(obj).length == 0;
}
// getData();

// Разбор по составу слова: «<strong>лоп<span class="red">а</span>та</strong>» — начальная форма существительного [И.п., ед.ч.]
// <span class="morphology example"><span class="stamm"><span class="wurzel">лоп<span class="red">а</span>т</span></span><span class="endung">а</span></span>
// ['лопат — корень', 'а — окончание', 'лопат — основа слова']
// <span class="morphology example"><span class="stamm"><span class="wurzel">карт<span class="red">о</span>ш</span><span class="suffix">к</span></span><span class="endung">а</span></span>
