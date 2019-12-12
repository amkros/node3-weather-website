console.log("cliend side javascript file");

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const mifuncion = async (address) => {
    const blob = await fetch(`/weather?address=${address}`);
    const data = await blob.json();   

    if (data.error){
        messageOne.textContent = data.error;
    }
    else{
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    }
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', ()=>{
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';    
    const  location = search.value;    
    mifuncion(location);
});


