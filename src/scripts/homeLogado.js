function getUser() {
  const user = JSON.parse(localStorage.getItem("token"));

  return user;
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
async function adoptPet(data) {
  const user = getUser();
  const token = user;

  const list = await fetch(`http://localhost:3333/adoptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((Err) => console.log(Err));
  return list;
}
console.log(adoptPet());
function openProfile() {
  const profileButton = document.querySelector(".Botao_Profile");

  profileButton.addEventListener("click", () => {
    window.location.replace("perfil.html");
  });
}

function backHome() {
  if (window.location.pathname == "/src/pages/perfil.html") {
    const button = document.querySelector(".Botao_Home");
    button.addEventListener("click", () => {
      window.location.replace("homeLogado.html");
    });
  }
}

function logout() {
  const button = document.querySelector(".Botao_Logout");
  button.addEventListener("click", () => {
    console.log("funcionando");
    localStorage.removeItem("@kenziePet:cadastro");
    window.location.replace("/index.html");
  });
}

async function renderPetsHome() {
  const ulTag = document.querySelector(".Lista_Pets");
  const list = await petList();
  list.forEach((element) => {
    if (element.available_for_adoption) {
      ulTag.insertAdjacentHTML(
        "beforeend",
        `
    <li class="Card_pet">
    <img class="Img_Pet" src=${element.avatar_url} alt="" />
    <h2 class="Nome_Pet">${element.name}</h2>
    <p class="Especie_Pet">${element.species}</p>
    <div class="btn-adption">
    <button id=${element.id} class="adopt hvr-wobble-vertical">Me adota?</button>
    </div>
</li>
    
    `
      );
    }
  });
  const buttonAdopt = document.querySelectorAll(".adopt");
  const modalAdopt = document.querySelector(".adoptModal");
  const confirmAdopt = document.querySelector(".Yes");
  const close = document.querySelector(".Fecha_Modal");

  buttonAdopt.forEach((element) => {
    const idPet = element.getAttribute("id");
    element.addEventListener("click", () => {
      console.log(idPet);
      modalAdopt.showModal();

      close.addEventListener("click", () => {
        modalAdopt.close();
      });

      //   confirmAdopt.addEventListener("click", async () => {
      //     await adoptPet(idPet);
      //     console.log(adoptPet(idPet));
      // });
    });
  });
}
renderPetsHome();
logout();
backHome();
openProfile();
