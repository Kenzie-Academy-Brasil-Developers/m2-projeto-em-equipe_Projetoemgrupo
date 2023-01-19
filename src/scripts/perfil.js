//Bruno-- cadastro e atualização de pet
function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));
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

  const { token } = user;

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
  const buttonAtualizaImg = document.querySelector(".Login_Btn");

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
  const { token } = user;
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
