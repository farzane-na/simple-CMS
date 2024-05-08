const $ = document
/////////////////// Starter Variable /////////////
const welcomeBox = $.querySelector(".welcome-box")
const menuItem = $.querySelectorAll(".menu-item")
const resultWrapper = $.querySelector(".result-wrapper")
const allResult = $.querySelectorAll(".result")
const messageModal=$.querySelector(".message-modal")
const messageModalText=$.querySelector(".message-modal-text")
const messageModalBtn=$.querySelector(".message-modal-btn")
//////////////////// Register Variable ///////////
const registerBtn = $.querySelector(".register")
const registerForm = $.querySelector(".register-form")
const captcha=$.querySelector(".form-capcha")
const submitBtn = $.querySelector(".submit-form")
const registerFirstname = $.querySelector(".firstname")
const registerLastname = $.querySelector(".lastname")
const registerEmail = $.querySelector(".email")
const registerPassword = $.querySelector(".password")
const capchaCode = $.querySelector(".form-capcha")
const capchaCodeRegisterForm = $.querySelector(".capcha-code")
const verifyPasswordRegisterForm = $.querySelector(".verify-pass")
//////////////////// table Variable ///////////
const allUser = $.querySelector(".all-user")
const userTable = $.querySelector(".user-table")
//////////////////// Login Variable ///////////
const loginBtn = $.querySelector(".login")
const loginForm = $.querySelector(".login-form")
const loginEmail = $.querySelector(".login-email")
const loginPassword = $.querySelector(".login-password")
const submitLoginBtn = $.querySelector(".submit-login")
const userBox = $.querySelector(".user-box")

//////////////////// Modal Variable ///////////
const modal = $.querySelector(".modal")
//////////////////// Delete Modal Variable ///////////
const deleteModal = $.querySelector(".delete-modal")
const accpetBtn = $.querySelector(".accept-btn")
const ignoreBtn = $.querySelector(".ignore-btn")
let userId = null
//////////////////// Edit Modal Variable ///////////
const editModal = $.querySelector(".edit-modal")
const submitEditModal = $.querySelector(".submit-edit-form")
const editFirstName = $.querySelector(".edit-firstname")
const editLastName = $.querySelector(".edit-lsstname")
const editEmail = $.querySelector(".edit-email")
const editPassword = $.querySelector(".edit-password")
const userIndex = null
//////////////////// Functions ///////////
const addClassToMenuItem = event => {
    let selectedMenuItem = event.currentTarget;
    menuItem.forEach(item => item.classList.remove("active-menu-item"))
    selectedMenuItem.classList.add("active-menu-item")
}
const closeWindow = () => {
    welcomeBox.classList.add("hide-welcome-box")
    allResult.forEach(result => result.classList.remove("visible"))
    userTable.classList.remove("visible-table")
    userBox.classList.remove("user-box-visible")
    modal.classList.remove("visible-modal")
    deleteModal.classList.remove("delete-modal-visible")
    editEmail.classList.remove("edit-modal-visible")
}
const showRegisterForm = (event) => {
    addClassToMenuItem(event)
    closeWindow()
    registerForm.classList.add("visible")
    creatCapchacode()

}
const creatCapchacode = () => {
    capchaCode.innerHTML = Math.floor(Math.random()*1000000)
}
const handleMessageModal=()=>{
    messageModalBtn.style.backgroundColor="red"
    modal.classList.add("visible-modal")
    messageModal.classList.add("message-modal-visible")
}
//////////////////// Functions For Register ///////////
const checkRegisterInput = () => {
    if (registerFirstname.value == "" || registerLastname.value == "" || registerEmail.value == "" || registerPassword.value == "" || capchaCodeRegisterForm.value == "" || verifyPasswordRegisterForm.value == "") {
        // window.alert("همه فیلد ها را پر کنید.")
        // messageModalBtn.style.backgroundColor="red"
        // modal.classList.add("visible-modal")
        // messageModal.classList.add("message-modal-visible")
        handleMessageModal()
        messageModalText.innerHTML="لطفا تمام فیلد ها را پر کنید"
    } else {
        if (registerPassword.value == verifyPasswordRegisterForm.value) {
            if (capchaCodeRegisterForm.value == capchaCode.innerHTML) {
                // addData()
                // creatCapchacode()
                checkValidEmailForRegister()
            }else{
                // alert("کد کپچا به درستی وارد نشد است.")
                // messageModalBtn.style.backgroundColor="red"
                // modal.classList.add("visible-modal")
                // messageModal.classList.add("message-modal-visible")
                handleMessageModal()
                messageModalText.innerHTML="کد کپچا به درستی وارد نشده است."
            }
        }else{
            if (capchaCodeRegisterForm.value == capchaCode.innerHTML) {
                // messageModalBtn.style.backgroundColor="red"
                // modal.classList.add("visible-modal")
                // messageModal.classList.add("message-modal-visible")
                handleMessageModal()
                messageModalText.innerHTML="رمز خود را به درستی وریفای نکردید"
            }else{
                // messageModalBtn.style.backgroundColor="red"
                // modal.classList.add("visible-modal")
                // messageModal.classList.add("message-modal-visible")
                handleMessageModal()
                messageModalText.innerHTML="رمز خود را به درستی وریفای نکردید. همچنین کپچا هم غلط وارد کردید!!"
            }
        }
    }
}
const checkValidEmailForRegister=()=>{
    fetch("https://cms-project-9712a-default-rtdb.firebaseio.com/users.json")
    .then(res=>res.json())
    .then(data=>{
        let isValidEmail=Object.entries(data).findIndex(user=>{
            return user[1].email==registerEmail.value
        })
        console.log(isValidEmail);
        if(isValidEmail==-1){
            addData()
            creatCapchacode()
        }else{
            // messageModalBtn.style.backgroundColor="red"
            // modal.classList.add("visible-modal")
            // messageModal.classList.add("message-modal-visible")
            handleMessageModal()
            messageModalText.innerHTML="عه! چی شد؟ این ایمیل قبلا ثبت شده :("
            clearRegisterForm()
            creatCapchacode()
        }
    })
}
const clearRegisterForm = () => {
    registerFirstname.value = ""
    registerLastname.value = ""
    registerEmail.value = ""
    registerPassword.value = ""
    verifyPasswordRegisterForm.value = ""
    capchaCodeRegisterForm.value = ""
    userImage.value = ""
}
const addData = () => {
    let newUser = {
        firstname: registerFirstname.value,
        lastname: registerLastname.value,
        email: registerEmail.value,
        password: registerPassword.value
    }
    fetch("https://cms-project-9712a-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => {
            console.log(res);
            // modal.classList.add("visible-modal")
            // messageModal.classList.add("message-modal-visible")
            handleMessageModal()
            modal.style.backgroundColor="var(--calm)"
            messageModalBtn.style.backgroundColor="yellowgreen"
            messageModalText.innerHTML="تبریک می گویم. شما با موفقیت ثبت نام شدید. حالا می توانید از بخش ورود، وارد پنل کاربری خود شوید. :)"
            clearRegisterForm()
        })
}
//////////////////// Functions For Create Table of Users ///////////
const showAccountTable = event => {
    addClassToMenuItem(event)
    closeWindow()
    userTable.classList.add("visible-table")
    getData()
}
const getData = () => {
    fetch("https://cms-project-9712a-default-rtdb.firebaseio.com/users.json", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(Object.entries(data));
            userTable.innerHTML = `
        <tr class="table-header">
            <th class="id-lbt">ID</th>
            <th class="name-lbt">نام شخص</th>
            <th class="email-lbt">ایمیل</th>
        </tr>
        `
            Object.entries(data).forEach(user => {
                // console.log(user);
                userTable.insertAdjacentHTML("beforeend", `
            <tr class="row">
                <td class="id column-table">${user[0]}</td>
                <td class="name column-table">${user[1].firstname} ${user[1].lastname}</td>
                <td class="email column-table">${user[1].email}</td>
            </tr>
            `)
            })
        })
}
//////////////////// Functions For Login ///////////
const showLoginForm = (event) => {
    addClassToMenuItem(event)
    closeWindow()
    loginForm.classList.add("visible")
}
const checkLoginField = () => {
    if (loginEmail.value == "" || loginPassword.value == "") {
        // alert("تمام فیلد هارا پر کنید")
        // messageModalBtn.style.backgroundColor="red"
        // modal.classList.add("visible-modal")
        // messageModal.classList.add("message-modal-visible")
        handleMessageModal()
        messageModalText.innerHTML="لطفا تمام فیلد ها را پر کنید"
    } else {
        checkValidUser()
    }
}
const checkValidUser = () => {
    fetch("https://cms-project-9712a-default-rtdb.firebaseio.com/users.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let findUserEmail = Object.entries(data).findIndex(user => {
                return user[1].email == loginEmail.value
            })
            console.log(findUserEmail);
            if (findUserEmail == -1) {
                // alert("چنین کاربری وجود ندارد. اول ثبت نام کنید")
                messageModalBtn.style.backgroundColor="red"
                modal.classList.add("visible-modal")
                messageModal.classList.add("message-modal-visible")
                messageModalText.innerHTML="چنین کاربری وجود ندارد. پس وارد بخش ثبت نام شوید و اول ثبت نام کنید"
            } else {
                console.log(Object.entries(data)[findUserEmail][1].password);
                if (loginPassword.value == Object.entries(data)[findUserEmail][1].password) {
                    loginForm.classList.remove("visible")
                    userBox.classList.add("user-box-visible")
                    fillUserData(findUserEmail)
                } else {
                    // alert("رمز وارد شده اشتباه است. لطفا دوباره تلاش کنید.")
                    // messageModalBtn.style.backgroundColor="red"
                    // modal.classList.add("visible-modal")
                    // messageModal.classList.add("message-modal-visible")
                    handleMessageModal()
                    messageModalText.innerHTML="رمزی که وارد شده اشتباه است. مجدد تلاش کنید"
                }
            }
        })
}
const fillUserData = user => {

    fetch("https://cms-project-9712a-default-rtdb.firebaseio.com/users.json")
        .then(res => res.json())
        .then(data => {
            console.log(Object.entries(data)[user]);
            userBox.innerHTML = ""
            userBox.insertAdjacentHTML("beforeend",
                `
        <h2 class="userid">شناسه یکتا شما : ${Object.entries(data)[user][0]}</h2>
            <div class="user-roperty">
                <div class="user-photo">
                    <img src="3d-illustration-person-with-sung.jpg" alt="">
                </div>
                <h3 class="user-email">${Object.entries(data)[user][1].email}</h3>
            </div>
            <h4 class="user-welcome">سلام ${Object.entries(data)[user][1].firstname} ${Object.entries(data)[user][1].lastname} . خوش آمدید.</h4>
            <h4 class="show-password">رمز شما : ${Object.entries(data)[user][1].password} </h4>
            <div class="user-handle">
                <button class="delete-user" onclick="showDeleteUser('${Object.entries(data)[user][0]}')">حذف حساب کاربری</button>
                <button class="edit-user" onclick="showEditUser('${Object.entries(data)[user][0]}')">ویرایش مشخصات</button>
            </div>
        `)
        })
}
const showDeleteUser = id => {
    console.log(id);
    userId = id
    modal.classList.add("visible-modal")
    deleteModal.classList.add("delete-modal-visible")
}
const deleteUser = () => {
    fetch(`https://cms-project-9712a-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: "DELETE"
        })
        .then(res => res.json)
    loginForm.classList.add("visible")
    userBox.classList.remove("user-box-visible")
    closeDeleteModal()
}
const closeDeleteModal = () => {
    modal.classList.remove("visible-modal")
    deleteModal.classList.remove("delete-modal-visible")
}
const showEditUser = id => {
    userId = id
    modal.classList.add("visible-modal")
    editModal.classList.add("edit-modal-visible")
    modal.style.backgroundColor = "var(--calm)"
    modal.style.backdropFilter = "blur(5px)"
    console.log(id);
}
const editUser = () => {
    console.log(userId);
    if (editEmail.value == "" || editFirstName.value == "" || editLastName.value == "", editPassword.value == "") {
        // alert("لطفا تمامی فیلد هارا پر کنید.")
        // messageModalBtn.style.backgroundColor="red"
        // modal.classList.add("visible-modal")
        // messageModal.classList.add("message-modal-visible")
        handleMessageModal()
        messageModalText.innerHTML="لطفا تمام فیلد ها را پر کنید"
    } else {
        let newUserData = {
            firstname: editFirstName.value,
            lastname: editLastName.value,
            email: editEmail.value,
            password: editPassword.value
        }
        fetch(`https://cms-project-9712a-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserData)
        }).then(res => {
            console.log(res);
            clearEditForm()
            closeEditForm()
            findUSerForEdit()
        })
    }
}
const clearEditForm = () => {
    editFirstName.value = ""
    editLastName.value = ""
    editEmail.value = ""
    editPassword.value = ""
}
const closeEditForm = () => {
    modal.classList.remove("visible-modal")
    editEmail.classList.remove("edit-modal-visible")
}
const findUSerForEdit = () => {
    fetch("https://cms-project-9712a-default-rtdb.firebaseio.com/users.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let fintUserWithId = Object.entries(data).findIndex(user => {
                return user[0] == userId
            })
            console.log(fintUserWithId);
            fillUserData(fintUserWithId)
        })
}
///////////////// Events //////////////////////////
registerBtn.addEventListener("click", showRegisterForm)
submitBtn.addEventListener("click", checkRegisterInput)
allUser.addEventListener("click", showAccountTable)
captcha.addEventListener("click",()=>creatCapchacode())
loginBtn.addEventListener("click", showLoginForm)
submitLoginBtn.addEventListener("click", checkLoginField)
accpetBtn.addEventListener("click", deleteUser)
ignoreBtn.addEventListener("click", closeDeleteModal)
submitEditModal.addEventListener("click", editUser)
messageModalBtn.addEventListener("click",()=>{
    modal.classList.remove("visible-modal")
    messageModal.classList.remove("message-modal-visible")
})