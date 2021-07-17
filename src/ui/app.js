const myform 	  	= document.getElementById('myform')
const title 	  	= document.getElementById('title')
const description 	= document.getElementById('description')

const articles 		= document.getElementById('articles')

let articleId;

const insertData = (newData) => {
	fetch('http://localhost:5000/add',{
		method:"POST",
		headers:{
			'Content-type':'application/json'
		},
		body:JSON.stringify(newData)
	})
	.then(resp 	 => resp.json())
	.then((data) => {
		getAllData();
	})
	.catch(error => console.log(error))
}

const getAllData = () => {
	fetch('http://localhost:5000/get',{
		method:"GET",
		headers:{
			'Content-type':'application/json'
		}
	})
	.then(resp 	 => resp.json())
	.then((data) => renderArticles(data))
	.catch(error => console.log(error))
}

function renderArticles(mydata){
	articles.innerHTML = '';
	mydata.forEach(data => {
		articles.innerHTML += `<div class="card card-body my-2">
									<h2>${data.title}</h2>
									<p>${data.description}</p>
									<h5>${data.date}</h5>

									<p>
									<button type="button" class="btn btn-success" onclick="getDataById('${data.id}')">Update</button>
									<button type="button" class="btn btn-danger" onclick="deleteData('${data.id}')">Delete</button>
									</p>
									</div>`
	})
}

const deleteData = (id) => {
	fetch(`http://localhost:5000/delete/${id}/`,{
		method:"DELETE",
		headers:{
			'Content-type':'application/json'
		}
	})
	.then((data) => {
		getAllData();
	})
}

const getDataById = (id) => {
	fetch(`http://localhost:5000/get/${id}/`,{
		method:"GET",
		headers:{
			'Content-type':'application/json'
		}
	})
	.then(resp 	 => resp.json())
	.then((data) => {
		// getAllData();
		renderOneItem(data);
	})
	.catch(error => console.log(error))
}

const renderOneItem = (mydata) => {
	title.value 		= mydata.title
	description.value 	= mydata.description

	articleId = mydata.id
}

const updteData = (articleId, mydata) => {
	fetch(`http://localhost:5000/update/${articleId}/`,{
		method:"PUT",
		headers:{
			'Content-type':'application/json'
		},
		body:JSON.stringify(mydata)
	})
	.then(resp 	 => resp.json())
	.then(() => {
		getAllData();
	})
	.catch(error => console.log(error))
}

myform.addEventListener('submit', (e) =>{
	e.preventDefault()

	const newData = {
		title: 			title.value,
		description: 	description.value
	}

	if(articleId){
		updteData(articleId, newData);
	}
	else{
		insertData(newData);
	}

	myform.reset();
})

getAllData();