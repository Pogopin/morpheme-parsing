
// import './assets/css/style.css';
type Data = {
    wordInformation: string;
    content: string;
    tableData: []
}

const contentResult = document.querySelector('.content__result');

const getData = async () => {
    const response = await fetch('http://localhost:3000/w', {
        method: "POST",
        body: encodeURIComponent('ворона')
    })
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data:Data = await response.json();
    let template: string;
    console.log(data)    

    if(!checkObject(data)) {
        if (contentResult) {
            template = data.content
            contentResult.innerHTML = template;
        }
    } else {
        if (contentResult) {
            template = 'нет'
            contentResult.innerHTML = template;
        }
    }    
    // return data;
}
const checkObject = (obj: Object): boolean => {
    return Object.keys(obj).length == 0;
}
getData();

// Разбор по составу слова: «<strong>лоп<span class="red">а</span>та</strong>» — начальная форма существительного [И.п., ед.ч.]
// <span class="morphology example"><span class="stamm"><span class="wurzel">лоп<span class="red">а</span>т</span></span><span class="endung">а</span></span>
// ['лопат — корень', 'а — окончание', 'лопат — основа слова']
// <span class="morphology example"><span class="stamm"><span class="wurzel">карт<span class="red">о</span>ш</span><span class="suffix">к</span></span><span class="endung">а</span></span>