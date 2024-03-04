const loadData = async () => {

    loadSpinner('spinner', true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    showData(data.posts);
}

const showData = (data) => {

    const showPost = document.getElementById('show-post');

    data.map(info => {
        const { author, category, comment_count, description, image, posted_time, title, view_count, isActive } = info;

        let indicator = '';
        if (isActive) {
            indicator = 'bg-green-500';
        }
        else {
            indicator = 'bg-red-500';
        }


        const postBox = document.createElement('div');

        postBox.classList = 'hero bg-base-200 mb-6 p-4 rounded-3xl';
        postBox.innerHTML = `
            <div class="hero-content flex-col lg:flex-row gap-4 lg:gap-8">
            <div class="indicator">
                <span class="indicator-item badge ${indicator}"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${image}" alt=""></div>
            </div>
        <div>
            <div class="flex gap-8">
                <p>#<span>${category}</span></p>
                <p>Author : ${author.name}</p>
            </div>
            <h1 class="text-3xl font-bold">${title}</h1>
            <p class="py-6">${description}</p>
            <hr class="w-full border-dashed border-[#a5a7d1] py-4">
            <div class="flex justify-between">
                <div class="flex gap-4">
                    <img src="./images/icons/9.png" alt="">
                    <p>${comment_count}</p>
                    <img src="./images/icons/10.png" alt="">
                    <p>${view_count}</p>
                    <img src="./images/icons/11.png" alt="">
                    <p><span>${posted_time}</span> min</p>
                </div>
                <div onclick='showMarked("${title.replace(/'/g, '-')}", ${view_count})' class="cursor-pointer">
                    <img src="./images/icons/12.png" alt="">
                </div>
            </div>
            
        </div>
        </div>
        `

        showPost.appendChild(postBox);


    })

    loadSpinner('spinner', false);
}


let count = 0;

const showMarked = (title, view_count) => {
    const markedPost = document.createElement('div');
    markedPost.classList = 'flex bg-white p-4 mt-4 rounded-xl';
    markedPost.innerHTML = `
    <div class="w-3/4">
        <p>${title}</p>
    </div>
    <div class="flex gap-2 items-center">
        <img class="size-6" src="./images/icons/10.png" alt="">
        <p>${view_count}</p>
    </div>
    `
    const markedPostContainer = document.getElementById('marked-post-container');
    markedPostContainer.appendChild(markedPost);

    const readPost = document.getElementById('read-post');
    count = count + 1;
    readPost.innerText = count;

}


const searchPost = () => {
    const searchedPost = document.getElementById('searched-post');
    loadSearchedData(searchedPost.value);
    const showPost = document.getElementById('show-post');
    showPost.textContent = '';
    searchedPost.value = '';
}

const loadSearchedData = async (searchValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`);
    const data = await res.json();

    showData(data.posts);
}

const loadLatestData = async () => {

    loadSpinner('spinner2', true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    showLatestData(data);
}

const showLatestData = (data) => {
    const latestPosts = document.getElementById('latest-posts');


    data.map(info => {

        const {cover_image, profile_image, title, description, author} = info;

        let postedDate = '';
        if(!author.posted_date){
            postedDate = 'No publish date';
        }
        else{
            postedDate = author.posted_date;
        }

        let authorDes = '';
        if(!author.designation){
            authorDes = 'Unknown';
        }
        else{
            authorDes = author.designation;
        }

        const latestPostContainer = document.createElement('div');


        latestPostContainer.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="p-4"><img class="rounded-xl" src="${cover_image}" alt="" /></figure>

        <div class="card-body">
            <div class="flex gap-3">
                <img src="./images/icons/14.png" alt="">
                <p>${postedDate}</p>
            </div>
          <h2 class="card-title">${title}</h2>
          <p>${description}</p>
          <div class="card-actions">
            <div class="flex gap-4 items-center">
                
                    <div class="avatar">
                        <div class="w-14 rounded-full">
                          <img src="${profile_image}" />
                        </div>
                      </div>
                
                <div>
                    <h3 class="text-lg font-bold">${author.name}</h3>
                    <p>${authorDes}</p>
                </div>
            </div>
          </div>
        </div>
      </div> 
        `
        latestPosts.appendChild(latestPostContainer);

    })

    loadSpinner('spinner2', false);
    

}

const loadSpinner = (spinnerId, isLoading) => {
    const spinner = document.getElementById(spinnerId);
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }    
}

loadData();
loadLatestData();