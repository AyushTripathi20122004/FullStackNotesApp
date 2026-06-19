
function CreateNotesAnimation(){
    gsap.from('.NotesCreate',{
        filter:"blur(20px)",
        opacity:0,
        ease:'back.out(0.2)'
    })
}


let NotesCollector = document.querySelector('.NotesCollector');
let NoteCreatePage=document.querySelector('.NotesCreate')
let CreateButton=document.querySelector('.CreateButton')

CreateButton.addEventListener('click',()=>{
    NoteCreatePage.style.display='flex';
    NotesCollector.style.display="none";
    CreateNotesAnimation()
    CreateButton.style.display="none"
})

let PageCancel=document.querySelector('.PageCancel')
PageCancel.addEventListener('click',()=>{
    NoteCreatePage.style.display='none';
    NotesCollector.style.display="flex";
    CreateButton.style.display="block"
})

let notes=[];

async function fetchNotes() {
    try {
        const response = await fetch('FetchNotes.php');
        const responseData = await response.json();
        notes=responseData;

        console.log("Notes:", responseData);
        DisplayNotes();

    } catch (error) {
        console.log("Error:", error);
    }
}

// when we reload the website the cards did'nt disaprears
window.addEventListener('DOMContentLoaded', () => {
    fetchNotes();
    
});


function animateCards() {
    gsap.from('.NotesCollector .card', {
        x: 100,
        filter: 'blur(10px)',
        opacity: 0,
        duration: 1,
        ease: 'back.out(0.2)',
        stagger:0.2
    });
}

// creat card and insert in notesCollector section
function DisplayNotes(){
    NotesCollector.innerHTML="";
    notes.forEach((note,index)=>{
        const div = document.createElement('div');     
        div.classList.add('card');
    
        div.innerHTML = `
        <div  style="background-color:${note.NotesColor}" class="h-[25rem]  w-[20rem] bg-black/5 p-1 flex flex-col relative gap-2 rounded-xl border border-black/10">

            <div class="flex border-b-2 border-white/10 py-2 px-6 justify-between items-center">

                <div style="color:${note.TitleColor}" class="px-6 py-1 text-nowrap uppercase rounded-full border w-fit border-white bg-white/10 font-semibold">
                    ${note.Title}
                </div>

                <form  action='DeleteNotes.php' method='post' class="flex items-center justify-end w-full">
                    <input type="hidden" name="Notescard" value="${note.NotesId}">
                    <button type='submit' name='NotesDelete' class="notesCancel">
                        <i style="color:${note.TitleColor}" class="bi bi-trash text-xl"></i>
                    </button>
                </form>

            </div>

            <div class="px-6 flex gap-2 flex-col">

                <h1 style="color:${note.TitleColor}" class="text-2xl uppercase font-medium">
                    ${note.Title}
                </h1>

                <p style="color:${note.TextColor}" class="text-s font-medium">
                    ${note.Text}
                </p>

            </div>
            <!-- edit button -->
            <button name='notesIdx' value='${note.NotesId}' class='EditNoteBtn absolute bottom-2 right-2 h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/20'>
                <i class="bi bi-pen text-white "></i>
            </button>

            <!-- Add to favorites button -->
            <button name='notesIdx' value='${note.NotesId}' class='favorites absolute bottom-2 left-2 h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/20'>
                <i class="bi bi-star starIcon"></i>
            </button>

        </div>
        `;

    NotesCollector.appendChild(div);
    

    })
    animateCards();

    
    // page edit functionality here
    const EditNoteBtn=document.querySelectorAll('.EditNoteBtn');
    
    const EditNotesPage=document.querySelector('.EditNotes')
    

    EditNoteBtn.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            if (EditNotesPage.classList.contains('hidden')){
                EditNotesPage.classList.remove('hidden');
                NotesCollector.style.display="none";

                id=btn.getAttribute('value')
                notesId=document.querySelector('.NotesId');
                notesId.value=id;

                EditNotesPage.classList.add('block');
                notes.forEach((note,index)=>{

                    if (Number(note.NotesId)===Number(id)){
                        
                        const title=EditNotesPage.querySelector('.Title');
                        console.log(EditNotesPage.querySelectorAll('.Title'));
                        const TitleColor=EditNotesPage.querySelector('.TitleColor');
                        const Text=EditNotesPage.querySelector('.Text');
                        const TextColor=EditNotesPage.querySelector('.TextColor');
                        const CardColor=EditNotesPage.querySelector('.CardColor')
                        console.log('dataMatched');
                        
                        title.value = note.Title;
                        TitleColor.value = note.TitleColor;
                        Text.value = note.Text;
                        TextColor.value = note.TextColor;
                        CardColor.value = note.NotesColor; 
                    }
                })
            }
        })
    })

    const EditPageCancel=document.querySelector('.EditPageCancel')
    EditPageCancel.addEventListener('click',()=>{
        if (EditNotesPage.classList.contains('block')){
                EditNotesPage.classList.remove('block');
                NotesCollector.style.display="flex";
                EditNotesPage.classList.add('hidden');
            }
    })

    const favoritesbtn = document.querySelectorAll('.favorites');

    favoritesbtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const starIcon = btn.querySelector('.starIcon');
            if (starIcon.style.color ='black') {
                starIcon.style.color = 'yellow';
            } else {
                starIcon.style.color = 'black';
            }
        });
    });
}


let searchedNotesStore = document.querySelector('.searchedNotes');
let searchButton = document.querySelector('.searchButton');

function renderNotes() {

    const searchText = document
        .querySelector('.searchbar')
        .value
        .trim()
        .toUpperCase();

    let html = "";

    notes.forEach((elem) => {

        if (elem.Title.toUpperCase().includes(searchText)) {

            html += `
                <div style="background-color:${elem.NotesColor}" class="h-[15rem] w-[20rem] bg-black/5 p-1 flex flex-col gap-2 rounded-xl border border-black/10">
                    
                    <div class="flex border-b-2 border-white/10 py-2 px-6 justify-between items-center">

                        <div style="color:${elem.TitleColor}" class="px-6 py-1 text-nowrap rounded-full border w-fit border-white bg-white/10 font-semibold">
                            ${elem.Title}
                        </div>

                        <form action="DeleteNotes.php" method="post" class="flex items-center justify-end w-full">
                            <input type="hidden" name="Notescard" value="${elem.NotesId}">
                            <button type="submit" name="NotesDelete">
                                <i style="color:${elem.TitleColor}" class="bi bi-trash text-xl"></i>
                            </button>
                        </form>

                    </div>

                    <div class="px-6 flex gap-2 flex-col">

                        <h1 style="color:${elem.TitleColor}" class="text-2xl uppercase font-medium">
                            ${elem.Title}
                        </h1>

                        <p style="color:${elem.TextColor}" class="text-s font-medium">
                            ${elem.Text}
                        </p>

                    </div>

                </div>
            `;
        }
        
    });

    if (html.length===0){
        html=`<div class="grid min-h-full [transform:translate(60%,0%)] justify-center items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div class="text-center">
                        <p class="text-base font-semibold text-indigo-600">404</p>
                        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Data not found</h1>
                        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t get the data you’re looking for.</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" class=" closeSearchNotes rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
                        <a href="#" class=" text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
            </div> `
    }

    searchedNotesStore.innerHTML = `
        <div class="absolute right-0 top-0">
        <button class="closeSearchNotes hover:bg-[#F0F0F0] h-10 transition-all duration-300 rounded-full w-10">
            <i class="bi text-3xl bi-x"></i>
        </button>
        </div>
        
        ${html}
    `;

    document.querySelectorAll(".NotesCollector").forEach((elem) => {
        elem.classList.add("hidden");
        elem.classList.remove("visible");
    });

    searchedNotesStore.classList.remove("hidden");
    searchedNotesStore.classList.add("visible");

}

searchButton.addEventListener("click", renderNotes);

document.addEventListener("click", (e) => {

    if (e.target.closest(".closeSearchNotes")) {

        searchedNotesStore.classList.remove("visible");
        searchedNotesStore.classList.add("hidden");

        document.querySelectorAll(".NotesCollector").forEach((elem) => {
            elem.classList.remove("hidden");
            elem.classList.add("visible");
        });
    }
});


// menu section code here
// animation for menusection

const menuBtn=document.querySelector('.menubtn button');
const menu=document.querySelector('.menu');

const MenuTl = gsap.timeline({ paused: true });

MenuTl
  .from('.menu', {
    x: '100%',
    duration: 0.25,
    ease: 'power2.out'
  })
  .from('.CloseMenu', {
    opacity: 0,
    duration: 0.1
  }, "<") // animate at same time as menu

  .fromTo('.menuLinks li',
    {
      x: 20,
      opacity: 0,
      filter: 'blur(10px)'
    },
    {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.15,
      ease: 'power2.out',
      stagger: 0.1
    },
    "-=0.05" // start before previous animation ends
  );


menuBtn.addEventListener('click',()=>{
    menu.style.display='block';
    MenuTl.restart()

})

const CloseMenu=document.querySelector('.CloseMenu')
CloseMenu.addEventListener('click',()=>{
    MenuTl.reverse()
})

MenuTl.eventCallback('onReverseComplete', () => {
    menu.style.display = 'none';
});



