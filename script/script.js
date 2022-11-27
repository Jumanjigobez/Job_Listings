//Function to ease getting of dom elements

const elem = (x) =>{
	return document.querySelector(x);
}


//Fetching json data dynamically
var contents_part = elem("#contents_part");


fetch("data.json").then(res => res.json())
.then(data =>{
	for(let i=0;i<10;i++){//Length of data items
		contents_part.innerHTML += `
		 <div class="job_card active">
	        <div class="part_1">
	          <div class="logo_part">
	            <img src="${data[i].logo}" alt="company logo">
	          </div>

	          <div class="info_part">

	            <div>
	              <h1 class="company">${data[i].company}</h1>
	              <p class="new">${data[i].new ? "NEW!" : "false"}</p>
	              <p class="featured">${data[i].featured ? "FEATURED" : "false"}</p>
	            </div>

	             <div>
	              <p class="position">${data[i].position}</p>
	            </div>

	             <div>
	              <ul>
	                <li>${data[i].postedAt}</li>
	                <li>.</li>
	                <li>${data[i].contract}</li>
	                <li>.</li>
	                <li>${data[i].location}</li>
	              </ul>
	            </div>

	          </div>

	        </div>

	        <div class="part_2">
	          <ul class="filters details">
	            <li><button class="btn" onclick="AddFilter(this)">${data[i].role}</button></li>
	            <li><button class="btn" onclick="AddFilter(this)">${data[i].level}</button></li>
	            ${data[i].languages ? data[i].languages.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
	            ${data[i].tools ? data[i].tools.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
	           
	          </ul>
	        </div>
  		</div>
		`;
		
			}
	//To make the new and the featured term not to be displayed if it is false
	var _new = document.querySelectorAll(".new"),
		featured = document.querySelectorAll(".featured"),
		job_card = document.querySelectorAll(".job_card");

	for(let i=0; i<10; i++){
		if(_new[i].textContent == "false"){
			_new[i].style.display = "none";
			
		}

		if(featured[i].textContent == "false"){
			featured[i].style.display = "none";
			job_card[i].classList.remove("active");
		}
	}

	
	console.log(data)


});


//Adding of filter for specific jobs
var filter_bar = elem("#filter_bar"),
	filters_place = elem(".filters");

let filters = [];//array where Filter terms will be stored 

const AddFilter = (y) =>{

	let filter_name = y.innerText;
	
	filter_bar.style.display = "flex";
	
	if(filters.includes(filter_name) == false){//Prevent user from clicking same item for filter

		filters.push(filter_name);

		filters_place.innerHTML += 
		`<li class="${filter_name}">${filter_name} <button class="close_btn" onclick="RemoveFilter(this)"><img src="images/icon-remove.svg" alt="remove filter"></button></li>`;

	}else{

		alert(`${filter_name} is already added to the filter`);

	}
	
	
	//Filtering data now
	fetch("data.json").then(res => res.json())
	.then(data =>{

		const filter_array = data.filter(d => d.role == `${filter_name}` || d.level == `${filter_name}` || d.languages.filter(e => e==`${filter_name}`) == `${filter_name}` || d.tools.filter(e => e==`${filter_name}`) == `${filter_name}`);
		
		contents_part.innerHTML = "";

		for(let i=0; i<filter_array.length; i++){

			contents_part.innerHTML += `
			 <div class="job_card active">
		        <div class="part_1">
		          <div class="logo_part">
		            <img src="${filter_array[i].logo}" alt="company logo">
		          </div>

		          <div class="info_part">

		            <div>
		              <h1 class="company">${filter_array[i].company}</h1>
		              <p class="new">${filter_array[i].new ? "NEW!" : "false"}</p>
		              <p class="featured">${filter_array[i].featured ? "FEATURED" : "false"}</p>
		            </div>

		             <div>
		              <p class="position">${filter_array[i].position}</p>
		            </div>

		             <div>
		              <ul>
		                <li>${filter_array[i].postedAt}</li>
		                <li>.</li>
		                <li>${filter_array[i].contract}</li>
		                <li>.</li>
		                <li>${filter_array[i].location}</li>
		              </ul>
		            </div>

		          </div>

		        </div>

		        <div class="part_2">
		          <ul class="filters details">
		            <li><button class="btn" onclick="AddFilter(this)">${filter_array[i].role}</button></li>
		            <li><button class="btn" onclick="AddFilter(this)">${filter_array[i].level}</button></li>
		            ${filter_array[i].languages ? filter_array[i].languages.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
		            ${filter_array[i].tools ? filter_array[i].tools.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
		           
		          </ul>
		        </div>
				</div>
			`;
		 }

			//To make the new and the featured term not to be displayed if it is false
		var _new = document.querySelectorAll(".new"),
			featured = document.querySelectorAll(".featured"),
			job_card = document.querySelectorAll(".job_card");

		for(let i=0; i<job_card.length; i++){
			if(_new[i].textContent == "false"){
				_new[i].style.display = "none";
				
			}

			if(featured[i].textContent == "false"){
				featured[i].style.display = "none";
				job_card[i].classList.remove("active");
			}
		}
				
			});
	
			

			
}

const RemoveFilter = (y) =>{
	let li_name = y.parentNode.className;

	filters.splice(filters.indexOf(li_name), 1);//Remove the filter item only in the list

	y.parentNode.style.display = "none";//Getting the li element

	fetch("data.json").then(res => res.json())
	.then(data =>{

		const filter_array = data.filter(d => d.role != `${li_name}` || d.level != `${li_name}` || d.languages.filter(e => e==`${li_name}`) != `${li_name}` || d.tools.filter(e => e==`${li_name}`) != `${li_name}`);
		
		console.log(filter_array);
		contents_part.innerHTML = "";

		for(let i=0; i<filter_array.length; i++){

			contents_part.innerHTML += `
			 <div class="job_card active">
		        <div class="part_1">
		          <div class="logo_part">
		            <img src="${filter_array[i].logo}" alt="company logo">
		          </div>

		          <div class="info_part">

		            <div>
		              <h1 class="company">${filter_array[i].company}</h1>
		              <p class="new">${filter_array[i].new ? "NEW!" : "false"}</p>
		              <p class="featured">${filter_array[i].featured ? "FEATURED" : "false"}</p>
		            </div>

		             <div>
		              <p class="position">${filter_array[i].position}</p>
		            </div>

		             <div>
		              <ul>
		                <li>${filter_array[i].postedAt}</li>
		                <li>.</li>
		                <li>${filter_array[i].contract}</li>
		                <li>.</li>
		                <li>${filter_array[i].location}</li>
		              </ul>
		            </div>

		          </div>

		        </div>

		        <div class="part_2">
		          <ul class="filters details">
		            <li><button class="btn" onclick="AddFilter(this)">${filter_array[i].role}</button></li>
		            <li><button class="btn" onclick="AddFilter(this)">${filter_array[i].level}</button></li>
		            ${filter_array[i].languages ? filter_array[i].languages.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
		            ${filter_array[i].tools ? filter_array[i].tools.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
		           
		          </ul>
		        </div>
				</div>
			`;
		 }

			//To make the new and the featured term not to be displayed if it is false
		var _new = document.querySelectorAll(".new"),
			featured = document.querySelectorAll(".featured"),
			job_card = document.querySelectorAll(".job_card");

		for(let i=0; i<job_card.length; i++){
			if(_new[i].textContent == "false"){
				_new[i].style.display = "none";
				
			}

			if(featured[i].textContent == "false"){
				featured[i].style.display = "none";
				job_card[i].classList.remove("active");
			}
		}
				
			});

	
}

const RemoveAll = () =>{

	filters_place.innerHTML = ``;

	filters = [];//Empty the filter list

	filter_bar.style.display = "none";

	fetch("data.json").then(res => res.json())
	.then(data =>{
		contents_part.innerHTML = "";

		for(let i=0;i<10;i++){//Length of data items
			contents_part.innerHTML += `
			 <div class="job_card active">
		        <div class="part_1">
		          <div class="logo_part">
		            <img src="${data[i].logo}" alt="company logo">
		          </div>

		          <div class="info_part">

		            <div>
		              <h1 class="company">${data[i].company}</h1>
		              <p class="new">${data[i].new ? "NEW!" : "false"}</p>
		              <p class="featured">${data[i].featured ? "FEATURED" : "false"}</p>
		            </div>

		             <div>
		              <p class="position">${data[i].position}</p>
		            </div>

		             <div>
		              <ul>
		                <li>${data[i].postedAt}</li>
		                <li>.</li>
		                <li>${data[i].contract}</li>
		                <li>.</li>
		                <li>${data[i].location}</li>
		              </ul>
		            </div>

		          </div>

		        </div>

		        <div class="part_2">
		          <ul class="filters details">
		            <li><button class="btn" onclick="AddFilter(this)">${data[i].role}</button></li>
		            <li><button class="btn" onclick="AddFilter(this)">${data[i].level}</button></li>
		            ${data[i].languages ? data[i].languages.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
		            ${data[i].tools ? data[i].tools.map((elem) => `<li><button class="btn" onclick="AddFilter(this)">${elem}</button></li>`).join(" ") : ""}
		           
		          </ul>
		        </div>
	  		</div>
			`;
			
				}
			//To make the new and the featured term not to be displayed if it is false
			var _new = document.querySelectorAll(".new"),
				featured = document.querySelectorAll(".featured"),
				job_card = document.querySelectorAll(".job_card");

			for(let i=0; i<10; i++){
				if(_new[i].textContent == "false"){
					_new[i].style.display = "none";
					
				}

				if(featured[i].textContent == "false"){
					featured[i].style.display = "none";
					job_card[i].classList.remove("active");
				}
			}


		});
}





