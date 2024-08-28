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
    console.log(data, "createaccount method");
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
    console.log(data, "login method");
    return data;
}

const GetLoggedInUser = async (username) => 
{
    let result = await fetch(`http://localhost:5148/api/User/GetUserByUsername/${username}`)
    userData = await result.json();
    console.log(userData, "getloggedinuser method");
    return userData;
    
}

const LoggedInData = () =>
{
    return userData;
}

//function to add our blog items:
const AddBlogItems = async (blogItems) => {
    const result = await fetch("http://localhost:5148/api/Blog/AddBlogItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogItems)
    });

    if (!result.ok) {
        const message = `Yo, you have an error! Status Code: ${result.status}`;
        console.error(message); 
        throw new Error(message); 
    }

    let data = await result.json();
    console.log(data, "addblogitems method");
    return data;
}

//can we make a generic function to handle
const sendData = async (controller,endpoint,passedInData) =>
{
    const result = await fetch(`http://localhost:5148/${controller}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(passedInData)
    });

    if (!result.ok) {
        const message = `Yo, you have an error! Status Code: ${result.status}`;
        console.error(message); 
        throw new Error(message); 
    }

    let data = await result.json();
    console.log(data, "sendData");
    return data;
}

//function to help us get our blogitems
const GetBlogItems = async () => 
{
    let result = await fetch("http://localhost:5148/api/blog/GetBlogItems")
    let data = await result.json();
    console.log(data, "getblogitems method");
    return data;
}

//create a function to hit our GetItemsByUserId
const GetItemsByUserId = async (UserId) =>
{
    let result = await fetch(`http://localhost:5148/api/blog/GetItemsByUserId/${UserId}`)
    let data = await result.json();
    console.log(data, "getitemsbyuserid method");
    return data;
}


export {checkToken, createAccount, login, GetLoggedInUser, LoggedInData, AddBlogItems, sendData, GetBlogItems, GetItemsByUserId}