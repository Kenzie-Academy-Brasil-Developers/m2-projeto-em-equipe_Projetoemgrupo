import { updateProfile } from "./requests.js"

//Vitor
async function updateProfileForm(){
    const user = await lerPerfil()
    const {email, name} = user
    const inputs = document.querySelectorAll("Form > input")
    const btnUpdate = document.getElementById("btnUpdate")
    const updateUser = {}

    inputs.forEach(input =>{
        if(input.name == 'name'){
            input.value = name
        } else if(input.name == 'email'){
            input.value = email
        }
    })

    btnUpdate.addEventListener('click', async (event) =>{
        event.preventDefault()

        inputs.forEach(input =>{
            updateUser[input.name] = input.value
        })

        if(updateUser.email == email || updateUser == ""){
            delete updateUser.email
        }

        renderPerfil(await updateProfile(updateUser))

    })
}

updateProfileForm()