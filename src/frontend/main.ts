
import './assets/css/style.css';

const getData = async () => {
    const response = await fetch('http://localhost:3000/w')
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    console.log('контент - ', typeof(data.content), data.content)
    console.log(data.tableData)
    return data;
}
// getData();


// string <span class="morphology example"><span class="stamm"><span class="wurzel">лоп<span class="red">а</span>т</span></span><span class="endung">а</span></span>
// ['лопат — корень', 'а — окончание', 'лопат — основа слова']