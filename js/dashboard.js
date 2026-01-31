// Dashboard API Interactions

// get appoinment data
function findappoinment(event){
    // get code fron user
    var code = document.getElementById("appdate").value;
    var url = "https://sheetdb.io/api/v1/xa7vj6uk2ngyj/search_or?appoinment_date=";
    var apiurl = url+code;
    const apiUrlapp = apiurl;

    fetch(apiUrlapp)
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        return response.json();
    })
    .then(data => {
        // Process the retrieved user data
        // console.log(data);

       // console.log(data)
       let staffs = data
       // console.log(staffs)
       var table = "<table class= table table-sm>";
       
       // now add another row to show subject
       table += `<tr>
                   <th>S.NO</th>
                   <th>date</th>
                   <th>Name</th>
                   <th>tvname</th>
                   <th>phone_number</th>
                   <th>appoinment_date</th>
                   <th>Problem</th>
                   <th>Status</th>
                   <th>Solved_date</th>
               </tr>`;
       // now loop through staffs
       // show their name and marks
       for(let i = 0; i < staffs.length; i++) {
           table += "<tr>";
           table += `<td>${i}</td>`;
           table += `<td>${staffs[i].date}</td>`;
           table += `<td>${staffs[i].name}</td>`;
           table += `<td>${staffs[i].tvname}</td>`;
           table += `<td>${staffs[i].phone_number}</td>`;
           table += `<td>${staffs[i].appoinment_date}</td>`;
           table += `<td>${staffs[i].Problem}</td>`;
           table += `<td>${staffs[i].Status}</td>`;
           table += `<td>${staffs[i].Solved_date}</td>`;
           // table += `<td>${staffs[i].Problem}</td>`;
           table += "</tr>";
       }
       table += "</table>";
       // append table to body
       document.getElementById("staffList").innerHTML += table;
   })
}
// all user data
function getuserdata(event){
    event.preventDefault();
    fetch('https://sheetdb.io/api/v1/xa7vj6uk2ngyj')
    .then(response =>response.json())
    .then(data => {

        // console.log(data)
        let staffs = data
        // console.log(staffs)
        var table = "<table class= table table-sm>";
        
        // now add another row to show subject
        table += `<tr>
                    <th>S.NO</th>
                    <th>date</th>
                    <th>Name</th>
                    <th>tvname</th>
                    <th>phone_number</th>
                    <th>appoinment_date</th>
                    <th>Problem</th>
                    <th>Status</th>
                    <th>Solved_date</th>
                </tr>`;
        // now loop through staffs
        // show their name and marks
        for(let i = 0; i < staffs.length; i++) {
            table += "<tr>";
            table += `<td>${i}</td>`;
            table += `<td>${staffs[i].date}</td>`;
            table += `<td>${staffs[i].name}</td>`;
            table += `<td>${staffs[i].tvname}</td>`;
            table += `<td>${staffs[i].phone_number}</td>`;
            table += `<td>${staffs[i].appoinment_date}</td>`;
            table += `<td>${staffs[i].Problem}</td>`;
            table += `<td>${staffs[i].Status}</td>`;
            table += `<td>${staffs[i].Solved_date}</td>`;
            table += "</tr>";
        }
        table += "</table>";
        // append table to body
        document.getElementById("userList").innerHTML += table;
    })
}
// find user by number
function finduser(event) {
    // get code fron user
    var code = document.getElementById("userphone").value;
    var url = "https://sheetdb.io/api/v1/xa7vj6uk2ngyj/search_or?phone_number=";
    var apiurl = url+code;
    // Specify the API endpoint for user data
    const apiUrl = apiurl;
    // Make a GET request using the Fetch API
    fetch(apiurl)
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        return response.json();
    })
    .then(data => {
        // Process the retrieved user data
        // console.log(data);

        var reg = data
        if(reg =="[object Object]" ){
            alertbox.render({
                alertIcon: 'success',
                title: 'Thank You!',
                message:'user found.',
                btnTitle: 'Ok',
                border:true
            });
        }
        else{
            alertbox.render({
                alertIcon: 'error',
                title: 'Thank You!',
                message: 'user not found.',
                btnTitle: 'Ok',
                border:true
            });
        }
        
        // alert(reg)
        var name = data[0].name;
        var date = data[0].date;
        var tvname = data[0].tvname;
        var phone_number = data[0].phone_number;
        var appoinment_date = data[0].appoinment_date;
        var Problem = data[0].Problem;
        var Status = data[0].Status;
        var Solved_date = data[0].Solved_date;

        document.getElementById("user_name").innerHTML=name;
        document.getElementById("user_date").innerHTML=date;
        document.getElementById("user_tvname").innerHTML=tvname;
        document.getElementById("user_phoner").innerHTML=phone_number;
        document.getElementById("user_appoinment").innerHTML=appoinment_date;
        document.getElementById("user_problem").innerHTML=Problem;
        document.getElementById("user_Status").innerHTML=Status;
        document.getElementById("user_Solved").innerHTML=Solved_date;
        

    })
    .catch(error => {
        console.error('Error:', error);
    });   
}
// Change update status.
function updateStatus() {
    var umno = document.getElementById("userphone").value;
    var urlp1 ="https://sheetdb.io/api/v1/xa7vj6uk2ngyj/phone_number/";
    var urlp2 = "?Status=complete";
    var totalurl = urlp1+umno+urlp2;
    // alert(totalurl)
    // call api
    fetch(totalurl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (response.ok) {
            alertbox.render({
                alertIcon: 'success',
                title: 'Thank You!',
                message:'Status updated.',
                btnTitle: 'Ok',
                border:true
            });
        } else {
            alertbox.render({
                alertIcon: 'error',
                title: 'Thank You!',
                message:'Status not updated.',
                btnTitle: 'Ok',
                border:true
            });
        }
    })
}
// Solved_date update
function updateSolvedDate() {
    var phone = document.getElementById("userphone").value;

    var urlpa1 = "https://sheetdb.io/api/v1/xa7vj6uk2ngyj/phone_number/"
    var urlpa2 = phone
    var urlpa3 ="?Solved_date="
    var date = new Date();
    var finalurl =urlpa1+urlpa2+urlpa3+date;
    // alert(finalurl) 

    // call api
    fetch(finalurl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (response.ok) {
            alertbox.render({
                alertIcon: 'success',
                title: 'Thank You!',
                message:'Status updated.',
                btnTitle: 'Ok',
                border:true
            });
        } else {
            alertbox.render({
                alertIcon: 'error',
                title: 'Thank You!',
                message:'Status not updated.',
                btnTitle: 'Ok',
                border:true
            });
        }
    })

}
// get all reports
function getReports() {
    var Type = document.getElementById("reportcont").value;
    var url = "https://sheetdb.io/api/v1/xa7vj6uk2ngyj/search?Status=";
    var apiurl = url+Type;
    // alert(apiurl)
    // call api
    fetch(apiurl)
    .then(response =>response.json())
    .then(data => {

        // console.log(data)
        let staffs = data
        // console.log(staffs)
        var table = "<table class= table table-sm>";
        
        // now add another row to show subject
        table += `<tr>
                    <th>S.NO</th>
                    <th>date</th>
                    <th>Name</th>
                    <th>tvname</th>
                    <th>phone_number</th>
                    <th>appoinment_date</th>
                    <th>Problem</th>
                    <th>Status</th>
                    <th>Solved_date</th>
                </tr>`;
        // now loop through staffs
        // show their name and marks
        for(let i = 0; i < staffs.length; i++) {
            table += "<tr>";
            table += `<td>${i}</td>`;
            table += `<td>${staffs[i].date}</td>`;
            table += `<td>${staffs[i].name}</td>`;
            table += `<td>${staffs[i].tvname}</td>`;
            table += `<td>${staffs[i].phone_number}</td>`;
            table += `<td>${staffs[i].appoinment_date}</td>`;
            table += `<td>${staffs[i].Problem}</td>`;
            table += `<td>${staffs[i].Status}</td>`;
            table += `<td>${staffs[i].Solved_date}</td>`;
            table += "</tr>";
        }
        table += "</table>";
        // append table to body
        document.getElementById("reportlist").innerHTML += table;
    })

}