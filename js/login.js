function showSignup() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('forgot-form').style.display = 'none';

        const signup = document.getElementById('signup-form');
        signup.style.display = 'block';
        // Small delay to allow display block to apply before removing hidden class for opacity transition
        setTimeout(() => {
            signup.classList.remove('hidden');
        }, 20);
    }, 400); // Matches CSS transition duration
}

function showLogin() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('forgot-form').style.display = 'none';

        const login = document.getElementById('login-form');
        login.style.display = 'block';
        setTimeout(() => {
            login.classList.remove('hidden');
        }, 20);
    }, 400);
}

function showForgot() {
    document.getElementById('login-form').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('login-form').style.display = 'none';

        const forgot = document.getElementById('forgot-form');
        forgot.style.display = 'block';
        setTimeout(() => {
            forgot.classList.remove('hidden');
        }, 20);
    }, 400);
}

// login function
function login() {
    // get user id and passweod
    var userId = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    var url = "https://script.google.com/macros/s/AKfycbwWQm1h5NMG8x66xaEunP9jnZe87MysByM52gPA8DFPqgHXBil45y4EXccLd40XKw8M/exec";
    var params = "?user_id=" + encodeURIComponent(userId);
    var fetchUrl = url + params;

    // validate user id and password
    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {

            var validUserId = data[0].user_id;
            var validPassword = data[0].password;
            var active = data[0].Statas;

            if (userId == validUserId && password == validPassword) {
                if (active == "Active") {
                    alertbox.render({
                        alertIcon: 'success',
                        title: 'Thank You!',
                        message: 'Login sucess.',
                        btnTitle: 'Ok',
                        border: true
                    });
                    // delay to dashboard
                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 2000);
                }
                if (active == "Pending") {
                    alertbox.render({
                        alertIcon: 'error',
                        title: 'Thank You!',
                        message: 'Your account is not active. Please contact the administrator.',
                        btnTitle: 'Ok',
                        border: true
                    });
                }
                else if (active == "Inactive") {
                    alertbox.render({
                        alertIcon: 'error',
                        title: 'Thank You!',
                        message: 'Your account is inactive. Please contact the administrator.',
                        btnTitle: 'Ok',
                        border: true
                    });
                }
            }
            else {
                alertbox.render({
                    alertIcon: 'error',
                    title: 'Thank You!',
                    message: 'Invalid User ID or Password.',
                    btnTitle: 'Ok',
                    border: true
                });
            }

        })
        .catch(error => console.error('Error:', error));
}
// sinup function
function signup() {
    // get user data from form
    var name = document.getElementById("signupName").value;
    var email = document.getElementById("signupEmail").value;
    var phone = document.getElementById("signupMobile").value;
    var password = document.getElementById("signupPassword").value;
    var cpassword = document.getElementById("signupConfirmPassword").value;

    // defalt values
    var id = "rgrt" + Math.floor(Math.random() * 1000000); // generate random id
    var userId = email;
    var role = "staff";
    var status = "pending";

    // validate password and cpassword
    if (password != cpassword) {
        alertbox.render({
            alertIcon: 'error',
            title: 'Thank You!',
            message: 'Password and Confirm Password do not match.',
            btnTitle: 'Ok',
            border: true
        });
        return;
    }
    // Setup data to google sheet api
    var url = "https://script.google.com/macros/s/AKfycbwWQm1h5NMG8x66xaEunP9jnZe87MysByM52gPA8DFPqgHXBil45y4EXccLd40XKw8M/exec";

    var data = {
        "action": "create",
        "id": id,
        "name": name,
        "phone_number": phone,
        "user_id": userId,
        "password": password,
        "email": email,
        "roal": role,
        "Statas": status
    };

    fetch(url, {
        method: "POST", // Use POST for data modification/creation
        mode: 'no-cors',
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            // Since mode is no-cors, we can't check response.ok. Assume success if we get here.
            alertbox.render({
                alertIcon: 'success',
                title: 'Success!',
                message: 'Account created successfully. Please login.',
                btnTitle: 'Ok',
                border: true
            });

            // Switch to login view after success
            setTimeout(() => {
                showLogin();
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            alertbox.render({
                alertIcon: 'error',
                title: 'Error',
                message: 'Something went wrong. Please try again.',
                btnTitle: 'Ok',
                border: true
            });
        });
}
// forgot password function
function forgotPassword() {

    // get user data from form
    var email = document.getElementById("forgotUserId").value.trim();
    var newPassword = document.getElementById("forgotNewPassword").value.trim();
    var confirmPassword = document.getElementById("forgotConfirmPassword").value.trim();

    // Validate passwords
    if (newPassword !== confirmPassword) {
        alertbox.render({
            alertIcon: 'error',
            title: 'Error',
            message: 'Passwords do not match.',
            btnTitle: 'Ok',
            border: true
        });
        return;
    }

    if (newPassword === "") {
        alertbox.render({
            alertIcon: 'error',
            title: 'Error',
            message: 'Please enter a new password.',
            btnTitle: 'Ok',
            border: true
        });
        return;
    }

    // setup data to google sheet api
    var url = "https://script.google.com/macros/s/AKfycbwWQm1h5NMG8x66xaEunP9jnZe87MysByM52gPA8DFPqgHXBil45y4EXccLd40XKw8M/exec";
    var params = "?id=" + encodeURIComponent(email);
    var fetchUrl = url + params;

    // First, verify user exists and is active
    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Forgot Password - User Data:", data); // Debug log
            if (data.length === 0) {
                alertbox.render({
                    alertIcon: 'error',
                    title: 'Error',
                    message: 'User ID not found.',
                    btnTitle: 'Ok',
                    border: true
                });
                return;
            }
            var validUserId = data[0].user_id;
            var active = data[0].Statas; // Note: 'Statas' as per user script/data
        });
    // send request to admin in telegram 
    var url = "https://script.google.com/macros/s/AKfycbwWQm1h5NMG8x66xaEunP9jnZe87MysByM52gPA8DFPqgHXBil45y4EXccLd40XKw8M/exec";
    var params = "?id=" + encodeURIComponent(email);
    var fetchUrl = url + params;
    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Forgot Password - User Data:", data); // Debug log
            if (data.length === 0) {
                alertbox.render({
                    alertIcon: 'error',
                    title: 'Error',
                    message: 'User ID not found.',
                    btnTitle: 'Ok',
                    border: true
                });
                return;
            }
            var validUserId = data[0].user_id;
            var active = data[0].Statas; // Note: 'Statas' as per user script/data
        });
}

