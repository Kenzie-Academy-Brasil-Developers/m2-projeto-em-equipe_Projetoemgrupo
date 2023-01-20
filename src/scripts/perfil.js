// Bruno-- cadastro e atualização de pet
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
    const token = user;

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
                // console.log(responseAvatar);
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
            window.location.replace("/index.html");
        });
    }
}
logout();

import { profilePage, deleteProfile } from "./requests.js";

export async function renderProfile() {
    const requestProfilePage = await profilePage();
    // console.log(requestProfilePage);
    const main = document.querySelector(".main_perfil");

    main.innerHTML = "";
    main.insertAdjacentHTML(
        "beforeend",
        `
            <div class="div_container">
            <img src="${requestProfilePage.avatar_url}" alt="" class="profileImg" />
            <div class="divInfos">
                <h2 class="titleProfile">Dados Pessoais</h2>
                <div class="divUserInfos">
                    <p class="descInfo">
                        <span class="purpleText">Nome: ${requestProfilePage.name}</span>
                    </p>
                    <p class="descInfo">
                        <span class="purpleText">Email: ${requestProfilePage.email}</span>
                    </p>
                    <p class="descInfo">
                        <span class="purpleText">Data de Nascimento: 21/03/2000</span>
                    </p>
                </div>
                <div class="divBtnProfile">
                    <button class="purpleBtn" id="btnUpdate"  data-id=${requestProfilePage.id} data-control-modal="modal-login">Atualizar informações</button>
                    <button class="redBtn" id="delete" data-id=${requestProfilePage.id}>Deletar conta</button>
                </div>
            </div>
        </div>
        `
    );

    const dialogModal = document.querySelector(".modal_AttProfile");
    const btnUpdateOpen = document.querySelector("#btnUpdate");
    btnUpdateOpen.addEventListener("click", () => {
        dialogModal.showModal();
    });
    const btnCloseModalAtt = document.querySelector(".closeAttModal_btn");
    btnCloseModalAtt.addEventListener("click", () => {
        dialogModal.close();
    });

    const deleteBtnModal = document.querySelector("#delete");
    const modalDeleteProfile = document.querySelector(".modal_deleteProfile");
    deleteBtnModal.addEventListener("click", () => {
        modalDeleteProfile.showModal();
    });

    const closeDeleteModalBtn = document.querySelector(".closeDeleteModal_Btn");
    closeDeleteModalBtn.addEventListener("click", () => {
        modalDeleteProfile.close();
    });

    const deleteMyAcc = document.querySelector(".deleteProfile");
    deleteMyAcc.addEventListener("click", () => {
        alert("Conta deletada com sucesso!");
        deleteProfile();
    });
    const notDeleteBtn = document.querySelector(".notDeleteBtn");
    notDeleteBtn.addEventListener("click", () => {
        alert("Obrigado por não deletar sua conta!");
        modalDeleteProfile.close();
    });
    return main;
}
renderProfile();

async function consomeUpdateProfile(data) {
    const user = getUser();
    const token = user;
    const atualizando = await fetch(`http://localhost:3333/users/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return atualizando;
}

async function updateProfileForm() {
    const nameProfile = document.querySelector("#nameProfile");
    const avatarProfile = document.querySelector("#avatarProfile");
    const btnProfileAtt = document.querySelector("#atualizarProfile");

    btnProfileAtt.addEventListener("click", async (event) => {
        event.preventDefault();
        const data = {
            name: nameProfile.value,
            avatar_url: avatarProfile.value,
        };
        const request = await consomeUpdateProfile(data);
        if (request.status == 200) {
            alert("Atualizado com sucesso");
            window.location.replace("../pages/perfil.html");
        } else {
            alert("Informação de atualização incompleta");
        }
        return request;
    });
}
updateProfileForm();
