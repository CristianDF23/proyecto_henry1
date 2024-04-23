class Activity {
    constructor(title, description, imgUrl) {
        this.id = Math.floor(Math.random() * 100000)
        this.title = title,
            this.description = description,
            this.imgUrl = imgUrl
    }
}

class Repository {
    constructor() {
        this.activities = []
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(actividad) {
        const newActivity = new Activity(actividad.title, actividad.description, actividad.imgUrl)
        this.activities.push(newActivity)
    }

    deleteActivity(id) {
        const index = this.activities.findIndex(activ => activ.id == id);
        return this.activities.splice(index, 1);
    }
}

const newRepository = new Repository();

//FUNCION PARA CREAR CADA UNA DE LAS TARJETAS QUE SE VAN A RENDERIZAR, ADEMAS INCLUYE LA FUNCIONALIDAD DEL BOTON PARA ELIMINAR LA TARJETA

function createCards(activity) {
    const { title, description, imgUrl, id } = activity
    const containerCard = document.createElement('div');
    const titleCard = document.createElement('h3');
    const descriptionCard = document.createElement('p');
    const imgUrlCard = document.createElement('img');
    const btnRemove = document.createElement('button');

    btnRemove.classList.add('remove');
    btnRemove.setAttribute('id', `${id}`)
    btnRemove.innerHTML = 'X';
    titleCard.innerHTML = title;
    descriptionCard.innerHTML = description;
    imgUrlCard.src = imgUrl;
    containerCard.classList.add('card');

    btnRemove.addEventListener('click', () => {
        newRepository.deleteActivity(id);
        alert('Tarjeta eliminada')
        renderCards()
    })

    containerCard.append(imgUrlCard, btnRemove, titleCard, descriptionCard)
    return containerCard
}

//FUNCION PARA RENDERIZAR EN PANTALLA LAS TARJETAS

function renderCards() {
    const containerActivities = document.getElementById('containerActivities');
    const titleContainer = document.getElementById('titleContainer')
    containerActivities.innerHTML = "";
    const allActivites = newRepository.getAllActivities()

    if (allActivites.length >= 1) {
        titleContainer.innerHTML = 'ACTIVIDADES NUEVAS'
    } else {
        titleContainer.innerHTML = ''
    }

    const renderActivities = allActivites.map(element => createCards(element))

    renderActivities.forEach(activ => containerActivities.append(activ))
}

//FUNCION CALLBACK DEL EVENTO CLICK DE BOTON PARA AGREGAR ACTIVIDAD

function handler(event) {
    event.preventDefault();
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const url = document.getElementById('url');

    if (title.value == '' || description.value == '' || url.value == '') {
        alert('Complete todos los campos')
    } else {
        const activity = { title: title.value, description: description.value, imgUrl: url.value };
        newRepository.createActivity(activity);
        alert('Tarjeta creada')
        title.value = '';
        description.value = '';
        url.value = '';
    }
    renderCards();
}

const addActivity = document.getElementById('addActivity');

addActivity.addEventListener('click', handler)

module.exports = {Activity, Repository}