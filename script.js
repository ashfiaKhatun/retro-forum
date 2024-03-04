const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    showData(data.posts);
}

const showData = (data) => {

    const showPost = document.getElementById('show-post');

    data.map(info => {
        const { author, category, comment_count, description, image, posted_time, title, view_count, isActive } = info;

        let indicator = '';
        if(isActive){
            indicator = 'bg-green-500';
        }
        else{
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
            <h1 class="text-5xl font-bold">${title}</h1>
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
}

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
}




/* 
<div class="flex bg-white p-4 mt-4 rounded-xl">
                            
                        </div>
*/



loadData();