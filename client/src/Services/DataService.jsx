let userData = {};

const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if (lsData && lsData != null) {
        result = true;
    }
    return result;
}

const createAccount = async (createdUser) => {
    const result = await fetch("http://localhost:5148/api/User/AddUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createdUser)
    });

    if (!result.ok) {
        const message = `Yo, you have an error! Status Code: ${result.status}`;
        console.error(message); 
        throw new Error(message); 
    }

    let data = await result.json();
    console.log(data);
}

const login =  async (loginUser) =>
{
    const result = await fetch("http://localhost:5148/api/User/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    });

    if (!result.ok) {
        const message = `Yo, you have an error! Status Code: ${result.status}`;
        console.error(message); 
        throw new Error(message); 
    }

    let data = await result.json();
    console.log(data);
    return data;
}

const GetLoggedInUser = async (username) => 
{
    let result = await fetch(`http://localhost:5148/api/User/GetUserByUsername/${username}`)
    userData = await result.json();
    console.log(userData);
    return userData;
    
}

const LoggedInData = () =>
{
    return userData;
}

export {checkToken, createAccount, login, GetLoggedInUser, LoggedInData}