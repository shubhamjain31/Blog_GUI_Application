const myform 	  	= document.getElementById('myform')
const title 	  	= document.getElementById('title')
const description 	= document.getElementById('description')

const articles 		= document.getElementById('articles')

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
		console.log(data)
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
									<button type="button" class="btn btn-success">Update</button>
									<button type="button" class="btn btn-danger">Delete</button>
									</p>
									</div>`
	})
}

myform.addEventListener('submit', (e) =>{
	e.preventDefault()

	const newData = {
		title: 			title.value,
		description: 	description.value
	}

	insertData(newData);
})

getAllData();