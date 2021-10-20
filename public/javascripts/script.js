const MainWord = document.querySelector('#title-n');
const text = MainWord.textContent;
const jumpLettersArray = [...text]
const getLetterHTML = jumpLettersArray.map(letter => `<span>${letter}</span>`).join('')
MainWord.innerHTML = getLetterHTML;