const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
    // create parents elements
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.innerHTML = '';

    const showAll = document.getElementById('show-all-button');


    // display show all button if there are more than 12 phones
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden')
    }
    else {
        showAll.classList.add('hidden')
    }

    // console.log('is show all', isShowAll)
    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-200 shadow-xl text-center py-4 mt-12';
        // set innerText or innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title mx-auto">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h4 class="text-2xl font-semibold">$999</h4>
            <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</button>
            </div>
        </div>
        
        `;
        // append Child
        phoneContainer.appendChild(phoneCard)

    });
    // hide progress spinner
    toggleProgressSpinner(false);
}

// show details button
const handleShowDetail = async(id) =>{
    console.log('amer name anik', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone)
    
    
}

// show phone details

const showPhoneDetails = (phone) =>{
    console.log(phone)
    // show the modal
    show_details_modal.showModal()
    
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img class="mx-auto" src="${phone.image}" />
    <h3 class="text-3xl font-semibold text-center">${phone.name}</h3>
    <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h4><span class="font-medium mt-4">Storage:</span>${phone.mainFeatures.storage}</h4>
    <h4><span class="font-medium mt-4">Display Size:</span>${phone.mainFeatures.displaySize}</h4>
    <h4><span class="font-medium mt-4">ChipSet:</span>${phone.mainFeatures.chipSet}</h4>
    <h4><span class="font-medium mt-4">Memory:</span>${phone.mainFeatures.memory}</h4>
    <h4><span class="font-medium mt-4">Slug:</span>${phone.slug}</h4>
    <h4><span class="font-medium mt-4">Release data:</span>${phone.releaseDate}</h4>
    <h4><span class="font-medium mt-4">Brand:</span>${phone.brand}</h4>
    <h4><span class="font-medium mt-4">GPS:</span>${phone?.others?.GPS || "No GPS"}</h4>
    <h4><span class="font-medium mt-4">GPS:</span>${phone?.others?.GPS? phone.others.GPS : "NO GPS available" }</h4>
    `;
}


// handle search button
const handleSearch = (isShowAll) => {
    toggleProgressSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll)
}

const toggleProgressSpinner = (isTrue) => {
    const loadingProgress = document.getElementById('loading-progress');
    if (isTrue) {
        loadingProgress.classList.remove('hidden')
    }
    else {
        loadingProgress.classList.add('hidden')
    }
}


// handle show all

const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();