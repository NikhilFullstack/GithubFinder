


const inputTab = document.getElementById('inputid');
const getdetail = document.querySelector('#getdetail')
const loading = document.querySelector('#loading')
const homepage = document.querySelector('#homepage');
const profilepage = document.querySelector('#profilepage');
const username = document.getElementById('username');
const username1 = document.getElementById('username1');
const reponame = document.querySelector('.reponame');
const company = document.querySelector('.company');
const bio = document.querySelector('.bio');
const address = document.querySelector('.address');
const blog = document.querySelector('.blog');
const repositories = document.querySelector('#repo');
const intro = document.querySelector('#intro');
const allrepo = document.querySelector('#allrepo');
const tenrepo = document.querySelector('#tenrepo');
const paginationdiv = document.querySelector('#paginationdiv');
const pageinclude = document.querySelector('#pageinclude');
var val;
var totalrepo;
var gpage=0;
document.getElementById('inputid').onkeydown = function(e){
    if(e.keyCode == 13){
      fun();
    }
 };
 async function show10repo(page){
    const paginachild = pageinclude.querySelectorAll('li');
    if(gpage!= 0){paginachild[gpage].classList.remove('bg-gray-200');
    paginachild[gpage].classList.add('text-gray-200');
    paginachild[gpage].classList.remove('text-gray-800');}
    gpage = page;
    allrepo.classList.remove("bg-gray-200");
    tenrepo.classList.add("bg-gray-200");
    tenrepo.classList.add("text-gray-800");
    tenrepo.classList.remove("text-gray-200");
    paginationdiv.classList.remove("hidden");
    paginachild[page].classList.add('bg-gray-200')
    paginachild[page].classList.remove('text-gray-200');
    paginachild[page].classList.add('text-gray-800');

    try{
        let repo=await fetch(`https://api.github.com/users/${val}/repos?per_page=10&page=${page}`);
        repo = await repo.json();
        console.log("repo:",repo);
        await homepage.classList.add("hidden");
        await profilepage.classList.remove("hidden");
        
        const component = repo.map((item,index)=>{
            return `
            <div key=${index} class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <div
                      class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg></div>
                    <h2 class="text-white text-lg title-font font-medium">${item.name}</h2>
                  </div>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-base">${item.description}</p>
                    <div class="languages my-2 grid grid-cols-4 gap-1"><button type="button"
                        class="block px-3 py-[2px] border-[1px] border-green-500 text-green-500 font-medium text-[8px] uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none 
                        focus:ring-0 transition duration-150 ease-in-out"
                        >${item.topics.map((item)=>{
                            item;
                        })}</button></div><a href="${item.html_url}"
                      class=" text-indigo-400 inline-flex items-center">View Repository<svg fill="none"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg></a>
                  </div>
                </div>
              </div>
            `;
        })
        repositories.innerHTML = component.join('');
    }
    catch(err){
        console.log(err);
    }
 }
 async function showall(){
    paginationdiv.classList.add("hidden");
    try{
        let repo=await fetch(`https://api.github.com/users/${val}/repos?per_page=1000&page=1`);
        repo = await repo.json();
        console.log("repo:",repo);
        
        const component = repo.map((item,index)=>{
            return `
            <div key=${index} class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <div
                      class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg></div>
                    <h2 class="text-white text-lg title-font font-medium">${item.name}</h2>
                  </div>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-base">${item.description}</p>
                    <div class="languages my-2 grid grid-cols-4 gap-1"><button type="button"
                        class="block px-3 py-[2px] border-[1px] border-green-500 text-green-500 font-medium text-[8px] uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none 
                        focus:ring-0 transition duration-150 ease-in-out"
                        >${item.topics.map((item)=>{
                            item;
                        })}</button></div><a href="${item.html_url}"
                      class=" text-indigo-400 inline-flex items-center">View Repository<svg fill="none"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg></a>
                  </div>
                </div>
              </div>
            `;
        })
        repositories.innerHTML = '';
        repositories.innerHTML = component.join('');
    }
    catch(err){
        console.log(err);
    }

 }
 async function fun(){
    
    val = inputTab.value;
    getdetail.classList.add("hidden");
    loading.classList.remove("hidden");
    try{
        let user=await fetch(`https://api.github.com/users/${val}`);
        user = await user.json();
        console.log("user:",user);
        totalrepo = user.public_repos;
        pageinclude.innerHTML ='';
        pageinclude.innerHTML += `<li class="page-item mx-1"><button
        class="page-link relative block py-1.5 px-3 border-0 bg-transparent hidden outline-none transition-all duration-300 rounded-full text-gray-200 hover:text-gray-600 hover:bg-gray-200 focus:shadow-none"
        href="#" onclick="show10repo(${gpage}-1)">Previous</button></li>`;
        for(let i=1;i<=totalrepo/10;i++)
        {
            pageinclude.innerHTML += `<li class="page-item mx-1 text-gray-200 hover:text-gray-600 hover:bg-gray-200 focus:shadow-none rounded-full"><button
            class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full "
            href="#" onclick="show10repo(${i})">${i}</button></li>`
        }
        pageinclude.innerHTML += `<li class="page-item mx-1"><button
        class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none hidden transition-all duration-300 rounded-full text-gray-200 hover:text-gray-600 hover:bg-gray-200 focus:shadow-none"
        href="#" onclick="show10repo(${gpage}+1)">Next</button></li>`;

        const introcomponent = `<div
                  class="h-full flex flex-col md:flex-row  items-center md:justify-start justify-center text-center md:text-left md:grid md:grid-cols-2">
                  <a style="width: 250px;" href="${user.html_url}" target="_blank" rel="noreferrer">
                  <img
                      alt="team" class="flex-shrink-0 rounded-lg cursor-pointer object-cover md:mb-0 mb-4 max-w-[100%]"
                      src="${user.avatar_url}" ></a>
                  <div class="flex-grow gap-1 lg:pl-8 md:pl-1">
                    <h2 class="title-font font-medium text-lg text-white">${user.login}</h2>
                    <h3 class="text-gray-500 mb-3">${user.company}</h3>
                    <p class="mb-4">${user.bio}</p><span class="inline-flex">🗺${user.location}</span><br>
                    <span
                      class="inline-flex"><a href="${user.blog}">⛓Blog</a></span>
                    <span
                      class="inline-flex"><a href="https://github.com/${user.login}?tab=repositories">⛓${user.public_repos} Public Repository</a></span>
                  </div>
                </div>`;
        intro.innerHTML = introcomponent;
        username.innerText = user.name;
        username1.innerText = user.name;
        let repo=await fetch(`https://api.github.com/users/${val}/repos?per_page=1000&page=1`);
        // considerring max 1000 repos
        repo = await repo.json();
        console.log("repo:",repo);
        await homepage.classList.add("hidden");
        await profilepage.classList.remove("hidden");
        const component = repo.map((item,index)=>{
            return `
            <div key=${index} class="p-4 md:w-1/3">
                <div class="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <div
                      class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg></div>
                    <h2 class="text-white text-lg title-font font-medium">${item.name}</h2>
                  </div>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-base">${item.description}</p>
                    <div class="languages my-2 grid grid-cols-4 gap-1"><button type="button"
                        class="block px-3 py-[2px] border-[1px] border-green-500 text-green-500 font-medium text-[8px] uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none 
                        focus:ring-0 transition duration-150 ease-in-out"
                        >${item.topics.map((item)=>{
                            item;
                        })}</button></div><a href="${item.html_url}"
                      class=" text-indigo-400 inline-flex items-center">View Repository<svg fill="none"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg></a>
                  </div>
                </div>
              </div>
            `;
        })
        repositories.innerHTML = component.join('');
    }
    catch(err){
        console.log(err);
    }
 }
 function reset(){
    getdetail.classList.remove("hidden");
    loading.classList.add("hidden");
    inputTab.value = '';
    homepage.classList.remove("hidden");
    profilepage.classList.add("hidden");

 }