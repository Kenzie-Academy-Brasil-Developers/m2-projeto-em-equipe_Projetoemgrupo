/* A cada Requisição coloque um comentário informando quem fez*/
//Gedson
export async function createUser(data) {
    const creatUserData = await fetch(`http://localhost:3333/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const creatUserDataJson = await creatUserData.json();

    if (!creatUserData.ok) {
        alert(`${creatUserDataJson.message}`);
        window.location.replace("./index.html");
    } else {
        alert(`Cadastro realizado com sucesso`);
        window.location.replace("./index.html");
    }
    return creatUserDataJson;
}

// Gabriel
export async function loginUser(dataLogin) {
    try {
        const request = await fetch(`http://localhost:3333/session/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataLogin),
        });
        let requestJson = await request.json();
        // console.log(requestJson);
        if (requestJson.token) {
            localStorage.setItem("token", JSON.stringify(requestJson.token));
            // console.log("logou");

            window.location.replace("./src/pages/homeLogado.html");
            return requestJson;
        } else {
            console.log(requestJson.message);
        }
    } catch (err) {
        console.log(err);
    }
}

export async function profilePage() {
    const tokenJson = localStorage.getItem("token");
    const token = JSON.parse(tokenJson);

    const request = await fetch("http://localhost:3333/users/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await request.json();
    return response;
}

export async function deleteProfile() {
    const tokenJson = localStorage.getItem("token");
    const token = JSON.parse(tokenJson);
    const deleteUser = await fetch("http://localhost:3333/users/profile", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (deleteUser.ok) {
        localStorage.clear();
        window.location.replace("../../index.html");
    }
}

