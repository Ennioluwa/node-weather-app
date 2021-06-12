console.log('This is coming from the javascript file');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const par1 = document.querySelector('#par1')
const par2 = document.querySelector('#par2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    par1.textContent('Loading...')
    fetch('/weather?address='+ location).then((response)=> {
    response.json().then((data) => {
        if (data.error) {
            par1.textContent(data.error);
        } else {
            par1.textContent = data.location;
            par2.textContent = data.forecast;

        }
        
    })

})
})