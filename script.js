const addbutton = document.querySelector("#add");

const updateLSData = () => {
    //create refrence for all textarea and store to array "notes"
    const textareadata = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareadata);

    //getiing data from all textarea and adding it values to notes
    textareadata.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes);

    //ADDING TO LACAL STORAGE----
    localStorage.setItem('notes', JSON.stringify(notes));
}




const addnewnote = (text = '') => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>

        <div class="main ${text ? "" : "hidden"} "> </div>
            <textarea class="${text ? "hidden" : ""}"></textarea> `;

  //Adding htmlData to under note DIV----------
  note.insertAdjacentHTML("afterbegin", htmlData);
  //console.log(note);


  //GETTING THE REFERENCE : ---------
  const editbutton = note.querySelector(".edit");
  const delbutton = note.querySelector(".delete");
  const maindiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");


  //DELECTING THE NODE ----------
  delbutton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });


  //toggle using edit button------------
  textarea.value = text;
  maindiv.innerHTML = text;


  editbutton.addEventListener('click', function(){
    maindiv.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
  })


  textarea.addEventListener('change', (event)=>{
    const values = event.target.value;
    maindiv.innerHTML = values;

    //CALLING LOCALSTORAGE FUNCTION--
    updateLSData();
  })


  document.body.appendChild(note);
};

//GETTING DATA BACK FROM LOCAL STORAGE IN OBJECT METHOD
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){ notes.forEach((note)=>{
    return addnewnote(note);
})}


addbutton.addEventListener("click", () => addnewnote());
