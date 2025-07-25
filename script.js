let skills=[]
let projects =[]
let notes =[]

const skillContainer = document.getElementById("skillcard")
const projectContainer = document.getElementById("projectcard")
const notesContainer = document.getElementById("notescontainer")

const newSkillBtn = document.getElementById('addskillbtn')
const newProjectBtn = document.getElementById('addprojectbtn')

const searchInput = document.getElementById("searchInput")
const filterType = document.getElementById("filtertype")
const sortAZ = document.getElementById("sortAZ")

newSkillBtn.addEventListener("click",()=>{
    const name = document.getElementById("newskillname").value;
    const hours = document.getElementById("newskilltime").value;
    const progress = document.getElementById("newskillprogress").value;
    const notes = document.getElementById("newskillnotes").value;

    if (name && hours && progress){
        skills.push({name,hours,progress,notes})
        renderSkills();
    }else{
        return;
    }
    const inputs = [
        document.getElementById("newskillname"),
        document.getElementById("newskilltime"),
        document.getElementById("newskillprogress"),
        document.getElementById("newskillnotes")
    ]
    inputs.forEach(i => i.value="")
})


function renderSkills(data=skills){
    skillContainer.innerHTML="";
    data.forEach((skill)=>{
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
        <h3>${skill.name}</h3>
        <p>🕒 ${skill.hours} hrs/week</p>
        <p>📈 Progress: ${skill.progress}%
        <p>📝 ${skill.notes}</p>
        `;
        skillContainer.appendChild(card)
    })
}

newProjectBtn.addEventListener("click",()=>{
    const name = document.getElementById("newprojectname").value;
    const status =document.getElementById("newprojectstatus").value;
    const desc = document.getElementById("newprojectdesc").value;

    if (name && status && desc){
        projects.push({name, status, desc})
        renderProjects()
    }else{
        return;
    }
    const inputs = [
        document.getElementById("newprojectname"),
        document.getElementById("newprojectstatus"),
        document.getElementById("newprojectdesc")
    ]
    inputs.forEach(i => i.value="")
})

function renderProjects(data=projects){
    projectContainer.innerHTML="";
    data.forEach((project)=>{
        const card =document.createElement("div")
        card.className="card"
        card.innerHTML=`
        <h3>${project.name}</h3>
        <p>Status: ${project.status}</p>
        <p>${project.desc}</p
        `;
        projectContainer.appendChild(card)
    })
}

searchInput.addEventListener("input",()=>{
    const term = searchInput.value.toLowerCase()
    const type = filterType.value

    if (type === "skills" || type === "all"){
        const filteredSkills = skills.filter(s => s.name.toLowerCase().includes(term))
        renderSkills(filteredSkills)
    }

    if (type === "projects" || type === "all"){
        const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(term))
        renderProjects(filteredProjects)
    }
})

sortAZ.addEventListener("click",()=>{
    const type = filterType.value;

    if (type === "skills" || type === "all"){
        skills.sort((a,b) => a.name > b.name ? 1 : -1)
        renderSkills()
    }

    if (type === "projects" || type === "all"){
        projects.sort((a,b)=> a.name > b.name ? 1 : -1)
        renderProjects()
    }

})

function createNoteOrLogForm(){
    const formOverlay = document.createElement("div")
    formOverlay.className="overlay"

    formOverlay.innerHTML=`
    <div class="form-popup">
        <h3>Add Note or Log</h3>
        <select id="entryType">
            <option value="note">Note</option>
            <option value="log">Log</option>
        </select>
        <input type="text" id="entryTitle" placeholder="Title"/>

        <select id="relatedTo">
            <option value="">Related To</option>
            ${skills.map(skill => `<option value="${skill.name}">Skill: ${skill.name}</option>`).join("")}
            ${projects.map(project => `<option value="${project.name}">Project: ${project.name}</option>`).join("")}
        </select>

        <textarea id="entryContent" rows="6" placeholder="Write your content here..."></textarea>

        <div class="btns">
            <button id="saveEntry">Save</button>
            <button id="cancelEntry">Cancel</button>
        </div>
    </div>
    `;

    document.body.appendChild(formOverlay);

    document.getElementById("cancelEntry").onclick =()=> formOverlay.remove();

    document.getElementById("saveEntry").onclick = () =>{
        const type = document.getElementById("entryType").value;
        const title = document.getElementById("entryTitle").value;
        const content = document.getElementById("entryContent").value;
        const related = document.getElementById("relatedTo").value;
        const date = new Date().toLocaleString();

        if (!content.trim()){
            alert("Please enter some content!");
            return
        }

        const noteCard = document.createElement("div");
        noteCard.className="note-card";
        noteCard.innerHTML=`
        <h4>${title || (type === "note" ? '📝 Note' : '📆 Log')}</h4>
        <p><strong>Type:</strong> ${type}</p>
        ${related ? `<p><strong>Related To:</strong> ${related}</p>`: ''}
        <p>${content}</p>
        <small>${date}</small>
        `;

        notesContainer.prepend(noteCard);
        formOverlay.remove();
    }
}

document.getElementById('createEntryBtn').addEventListener('click',()=>{
    const type = document.getElementById('entryTypeSelector').value;
    const container = document.getElementById('dynamicEntryForm')
    container.innerHTML=""

    if(!type){
        alert("Please select an entry type");
        return;
    }
    const form = document.createElement("div")
    form.classList.add("dynamic-form")

    const title = document.createElement("input")
    title.type='text';
    title.placeholder= `Title for your ${type}`

    const desc = document.createElement("textarea")
    desc.rows=4;
    desc.placeholder = `Write your ${type} here...`;

    const saveBtn = document.createElement('button')
    saveBtn.innerText = `Save ${type.charAt(0).toUpperCase() + type.slice(1)}`

    saveBtn.addEventListener('click',()=>{
        const entryData = {
            type,
            title: title.value.trim(),
            description:desc.value.trim(),
            date: new Date().toLocaleString()
        }

        if( !entryData.title || !entryData.description){
            alert("Both Title and Description is required")
            return;
        }
        displayEntry(entryData)
        container.innerHTML=''
    })

    form.appendChild(title)
    form.appendChild(desc)
    form.appendChild(saveBtn)

    container.appendChild(form)
})

function displayEntry(entry){
    const card = document.createElement("div")
    card.classList.add('card')
    card.innerHTML=`
    <h4>${entry.type.toUpperCase()} - ${entry.title}</h4>
    <p>${entry.description}</p>
    <small>🕒 ${entry.date}</small>
    `;

    document.getElementById('extras').appendChild(card)
}