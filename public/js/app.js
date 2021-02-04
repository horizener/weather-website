
// fetch('http://localhost:3000/weather?address=philadelphia').then((response) => {
//     response.json().then((data)=> {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     }) 
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From js'

weatherForm.addEventListener('click', (e)=> {
    
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=> {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = 'error'

        } else {
            // console.log(data.location)
            console.log(data.data)
            messageOne.textContent = ` the current temperature is ${data.data.temperature} and there is a chance of ${data.data.precip}% rain and the weather will be ${data.data.weather_descriptions}`

            messageTwo.textContent = `${data.location}`

        }
    }) 
})

    
})