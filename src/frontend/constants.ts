import { Toast } from 'bootstrap';

const toastContent = document.querySelector('.toast');
const toast = new Toast(toastContent);

const contentResult = document.querySelector('.content__result');
const inputValue = document.querySelector('.form-control') as HTMLInputElement;    
const btn = document.querySelector('.btn-info') as HTMLInputElement;
const word = document.querySelector('.content__text');
const mParse = document.querySelector('.morphology__parse');

const spinner = document.querySelector('.spinner-border');

export  { toast, contentResult, inputValue, btn, word, mParse, spinner };