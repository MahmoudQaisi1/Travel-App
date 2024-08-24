async function deleteCard(id){
    try{
        const response = await fetch('http://localhost:8000/deleteDestination',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:id
            })
        });

        const data = await response.json();

        if(data.success){
            document.getElementById(id).remove();
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        console.log(error);
    }
}

function flipPolaroids(id){
    const cardContainer = document.getElementById(id);
    cardContainer.querySelector(`.card1`).classList.toggle('top');
    cardContainer.querySelector(`.card2`).classList.toggle('top');
}

export function destinationsEventListener(event){
    const target = event.target.parentElement;
    const id = target.parentElement.id;
    if(target.classList.contains('delete-button')){
        deleteCard(id);
    }else if(target.classList.contains('rotate-button')){
        flipPolaroids(id);
    }
}