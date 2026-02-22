let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

//count 

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let RejectedCount = document.getElementById('RejectedCount');
let jobTotal = document.getElementById('jobTotal');

// button id===========
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');
// console.log(total, thrivingCount, strugglingCount)

// =============================
const allCardsSection = document.getElementById('allCards');
// console.log(allCardsSection.children.length);
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section')
const emptyState = document.getElementById('empty-state');

//calculation count 
function calculationCount() {
    total.innerText = allCardsSection.children.length;

    interviewCount.innerText = interviewList.length;

    RejectedCount.innerText = rejectedList.length;

    jobTotal.innerText = allCardsSection.children.length;

}

calculationCount()
/**====================================== */
//===========
//step 1 button toggle =================

function toggleStyle(id) {

    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    //========

    allFilterBtn.classList.add('bg-white', 'text-[#64748B]');

    interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]');

    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    // =====================

    const selected = document.getElementById(id);

    currentStatus = id;

    // console.log(selected);
    //adding black bg for current button
    selected.classList.add('bg-[#3B82F6]', 'text-white');
    selected.classList.remove('bg-white', 'text-[#64748B]');

    if (id == 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterView()
        checkEmptyState(interviewList.length);

    } else if (id == 'all-filter-btn') {
        allCardsSection.classList.remove('hidden')
        filterSection.classList.add('hidden');
        checkEmptyState(allCardsSection.length);

    } else if (id == 'rejected-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected()
        checkEmptyState(rejectedList.length);
    }

}
// find empty state 
function checkEmptyState(listLength) {
    if (listLength === 0) {
        emptyState.classList.remove('hidden')
    } else {
        emptyState.classList.add('hidden')
    }
}



//main  
mainContainer.addEventListener('click', function (event) {


    // interview button logic
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const plantName = parentNode.querySelector('.plantName').innerText;
        const latinName = parentNode.querySelector('.latinName').innerText;

        const remoteJob = parentNode.querySelector('.remoteJob').innerText;

        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = 'Interview';

        const cardInfo = {
            plantName,
            latinName,
            remoteJob,
            status: 'Interview',
            notes,
        }

        const plantExist = interviewList.find(item => item.plantName == cardInfo.plantName);

        if (!plantExist) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.plantName != cardInfo.plantName);

        calculationCount();

        if (currentStatus === 'interview-filter-btn') {
            renderInterView()
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderRejected()
        };

    } else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const plantName = parentNode.querySelector('.plantName').innerText;
        const latinName = parentNode.querySelector('.latinName').innerText;
        const remoteJob = parentNode.querySelector('.remoteJob').innerText;


        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = 'Rejected';

        const cardInfo = {
            plantName,
            latinName,
            remoteJob,
            status: 'Rejected',
            notes,
        }

        const plantExist = rejectedList.find(item => item.plantName == cardInfo.plantName);

        if (!plantExist) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.plantName != cardInfo.plantName);

        calculationCount();

        if (currentStatus == 'interview-filter-btn') renderInterView();
        else if (currentStatus == 'rejected-filter-btn') renderRejected();
    }

    // delete button===================
    const fabIcon = event.target.classList.contains('fa-trash-can');
    const deleteBtn = event.target.classList.contains('btn-delete');

    if (fabIcon || deleteBtn) {
        const card = event.target.closest('.card');
        const name = card.querySelector('.plantName').innerText;

        interviewList = interviewList.filter(item => item.plantName !== name);
        rejectedList = rejectedList.filter(item => item.plantName !== name);

        card.remove();

        calculationCount();

        if (currentStatus === 'interview-filter-btn') {
            renderInterView()
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderRejected()
        };
    }

});

/**============== */


function renderInterView() {
    filterSection.innerHTML = '';

    for (let interview of interviewList) {
        // console.log(interview);

        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white shadow-md rounded-xl p-8 my-5';
        div.innerHTML =
            `
            <!-- main part 1 -->
                <div class="space-y-6 ">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-2xl font-bold text-[#002C5C]">${interview.plantName}</p>
                        <p class="latinName text-[16px] text-[#64748B]">${interview.latinName}</p>
                    </div>

                    <!-- part 2 -->
                     
                        <p class="remoteJob text-[18px] font-semibold text-[#64748B]">${interview.plantName}</p>

                
                    <!-- part 3 -->
                    <p class="status   ">${interview.status}</p>
                    <p class="notes">${interview.notes}</p>

                    <div class="flex gap-5">
                        <button
                            class="interview-btn border border-[#10B981] rounded-lg text-[#10B981] px-4 py-2 cursor-pointer active:scale-95 duration-200 ">interview</button>
                        <button
                            class="rejected-btn border border-[#EF4444] rounded-lg text-[#EF4444] px-4 py-2 cursor-pointer active:scale-95 duration-200 ">Rejected</button>
                    </div>
                </div>

                <!-- main part 2 -->
                <div class="flex items-center justify-center bg-red-100  w-8 h-8 rounded-full">
                    <button class="btn-delete  text-red-600  cursor-pointer active:scale-95 duration-200">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
     

        `;


        filterSection.appendChild(div)
    }

}

/**============== */

function renderRejected() {
    filterSection.innerHTML = '';

    for (let rejected of rejectedList) {
        // console.log(rejected);

        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white shadow-md rounded-xl p-8 my-5';
        div.innerHTML =
            `
 <!-- main part 1 -->
                <div class="space-y-6 ">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-2xl font-bold text-[#002C5C]">${rejected.plantName}</p>
                        <p class="latinName text-[16px] text-[#64748B]">${rejected.latinName}</p>
                    </div>

                    <!-- part 2 -->
                 
                        <p class="remoteJob text-[18px] font-semibold text-[#64748B]">${rejected.plantName}</p>

                 
                    <!-- part 3 -->
                    <p class="status   ">${rejected.status}</p>
                    <p class="notes">${rejected.notes}</p>

                    <div class="flex gap-5">
                        <button
                            class="interview-btn border border-[#10B981] rounded-lg text-[#10B981] px-4 py-2 cursor-pointer active:scale-95 duration-200 ">interview</button>
                        <button
                            class="rejected-btn border border-[#EF4444] rounded-lg text-[#EF4444] px-4 py-2 cursor-pointer active:scale-95 duration-200 ">Rejected</button>
                    </div>
                </div>

                <!-- main part 2 -->
                <div class="flex items-center justify-center bg-red-100  w-8 h-8 rounded-full">
                    <button class="btn-delete  text-red-600  cursor-pointer active:scale-95 duration-200">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
     

    `;

        filterSection.appendChild(div)

    }

}
