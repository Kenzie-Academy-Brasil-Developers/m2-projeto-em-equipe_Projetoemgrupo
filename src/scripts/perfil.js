// Bruno-- cadastro e atualização de pet
import { updateProfile, deleteProfile } from "./requests.js";

//Vitor
//Atualizar Perfil
async function updateProfileForm() {
    const user = await renderProfile();
    const { email, name } = user;
    const inputs = document.querySelectorAll("Form > input");
    const btnUpdate = document.getElementById("btnUpdate");
    const updateUser = {};

    inputs.forEach((input) => {
        if (input.name == "name") {
            input.value = name;
        } else if (input.name == "email") {
            input.value = email;
        }
    });

    btnUpdate.addEventListener("click", async (event) => {
        event.preventDefault();

        inputs.forEach((input) => {
            updateUser[input.name] = input.value;
        });

        if (updateUser.email == email || updateUser == "") {
            delete updateUser.email;
        }

        renderPerfil(await updateProfile(updateUser));
    });


    const buttons = document.querySelectorAll("[data-control-modal]")
    for( let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(){
            let valorModal = buttons[i].getAttribute("data-control-modal")
            document.getElementById(valorModal).classList.toggle("show-modal")
        })

}

async function deleteUser(){
    const btnDelete = document.getElementById("delete")

    btnDelete.addEventListener("click",async (event) =>{
        event.preventDefault

        deleteProfile()

    })
}
deleteUser()

updateProfileForm();
//Bruno-- cadastro e atualização de pet
function getUser() {
    const user = JSON.parse(localStorage.getItem("token"));
    // console.log(user);
    return user;
}

function modalRegister() {
    const modal = document.querySelector(".Modal_Cadastro");
    const btn = document.querySelector("#register");
    const closeModal = document.querySelector(".Fecha_Modal");
    btn.addEventListener("click", () => {
        modal.showModal();
    });
    closeModal.addEventListener("click", () => {
        modal.close();
    });
}

async function petList() {
    const user = getUser();
    const { token } = user;

    const list = await fetch(`http://localhost:3333/pets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())

        .catch((Err) => console.log(Err));
    return list;
}

async function atualizationImg(id, body) {
    const user = getUser();

    const token = user;

    const consomeApi = await fetch(`http://localhost:3333/pets/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    return consomeApi;
}

async function renderPets() {
    const ulTag = document.querySelector("ul");
    const list = await petList();

    list.forEach((element) => {
        if (element.available_for_adoption) {
            element.available_for_adoption = "Sim";
        } else {
            element.available_for_adoption = "Adotado";
        }
        ulTag.insertAdjacentHTML(
            "beforeend",
            `
          <li  class="pet">
          <div class="pet-avatar">
          <img src=${element.avatar_url} />
          </div>
          <div class="pet-info">
            <h2><span class="infos">Nome:</span> ${element.name}</h2>
            <h2><span class="infos">Espécie:</span> ${element.bread}</h2>
            <h2><span class="infos">Adotavel:</span> ${element.available_for_adoption}</h2>
            <button data-id=${element.id} class="attPet" id="refresh">Atualizar</button>
          </div>
        </li>
      `
        );
    });
    const buttonAtualizaImg = document.querySelector(".AttBtn");

    const btnAtt = document.querySelectorAll("#refresh");
    const modal = document.querySelector(".Modal_Login");
    const buttonCloseModal = document.querySelector(
        ".Fecha_Modal.closeLoginModal_Btn"
    );

    const newName = document.querySelector("#new-name");
    const newBread = document.querySelector("#new-bread");
    const newEspecie = document.querySelector("#new-especie");

    const inputTag = document.querySelector("#new-avatar");
    btnAtt.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            modal.showModal();

            const idCard = element.getAttribute("data-id");
            console.log(idCard);
            buttonAtualizaImg.addEventListener("click", async (evento) => {
                evento.preventDefault();
                const data = {
                    name: newName.value,
                    bread: newBread.value,
                    species: newEspecie.value,
                    avatar_url: inputTag.value,
                };

                const responseAvatar = await atualizationImg(idCard, data);
                console.log(responseAvatar);
                if (responseAvatar.status == 200) {
                    alert("Atualizado com sucesso");
                    window.location.replace("../pages/perfil.html");
                } else {
                    alert("Informação de atualização incompleta");
                }
            });
        });
    });
    buttonCloseModal.addEventListener("click", (event) => {
        modal.close();
    });
}

async function petRegister(data) {
    const user = getUser();
    const token = user;
    const consome = await fetch(`http://localhost:3333/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return consome;
}

function cadastroPet() {
    const name = document.querySelector("#name");
    const raça = document.querySelector("#raça");
    const breed = document.querySelector("#breed");
    const avatar = document.querySelector("#avatar");
    const btn = document.querySelector("#register-pet");
    btn.addEventListener("click", async (event) => {
        event.preventDefault();
        const data = {
            name: name.value,
            bread: raça.value,
            species: breed.value,
            avatar_url: avatar.value,
        };
        const request = await petRegister(data);

        if (request.status == 400) {
            console.log(data);

            alert("Verifique se as informações foram preenchidas corretamente");
        } else if (request.status == 200) {
            alert("Pet cadastrado com sucesso!");
            window.location.replace("../pages/perfil.html");
        }
    });
}

renderPets();
cadastroPet();
modalRegister();
// import { ProfilePage } from "./requests.js";
//import{logout} from "./homeLogado.js"

// ProfilePage();

// export function renderProfile(data) {
//     if (window.location.pathname == "./src/pages/perfil.html") {
//         let { avatar_url, name, email, my_pets } = data;
//         const main = document.querySelector("main");

//         main.insertAdjacentHTML(
//             "beforeend",
//             `
//         <div class="profile">
//         <div class="profile-banner"></div>
//         <div class="profile-container">
//             <img src="${avatar_url}" class="profile-img">
//             <div class="profile-info">
//                 <div class="title-container">
//                     <h3 class="profile-info-title">Dados Pessoais</h3>
//                 </div>
//             <div class="info-container">
//                 <p class="profile-name">Nome: ${name}</p>
//                 <p class="profile-email">E-mail: ${email}</p>
//                 <p class="birth-date">Data de nascimento: 21/03/2000</p>
//             </div>
//             <div class="buttonSection">
//                 <button class="change-info">Atualizar Informações</button>
//                 <button class="delete-account">Deletar Conta</button>
//             </div>
//             </div>
//         </div>
//      </div>
//           <div class="pet-section">
//              <button class ="register-pet">Cadastrar novo pet</button>
//              <div class="user-pets">
//             </div>
//         `
//         );
//     }
// }
function backHome() {
    if (window.location.pathname == "/src/pages/perfil.html") {
        const button = document.querySelector(".Botao_Home");
        button.addEventListener("click", () => {
            window.location.replace("homeLogado.html");
        });
    }
}
backHome();

function logout() {
    if (window.location.pathname == "/src/pages/perfil.html") {
        const button = document.querySelector(".Botao_Logout");
        button.addEventListener("click", () => {
            localStorage.removeItem("@kenziePet:cadastro");
            window.location.replace("/homedeslogado.html");
        });
    }
}
logout();
