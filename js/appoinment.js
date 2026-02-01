// get data from form and submit appointment

function sendAppointmentData() {
  try {
    // get form data
    var cname = document.getElementById("name") ? document.getElementById("name").value : "";
    var cphone = document.getElementById("pnumber") ? document.getElementById("pnumber").value : "";
    var caddress = document.getElementById("inputAddress") ? document.getElementById("inputAddress").value : "";
    var ctvbrand = document.getElementById("tvbrand") ? document.getElementById("tvbrand").value : "";
    var ctvinches = document.getElementById("tvInches") ? document.getElementById("tvInches").value : "";
    var cproblem = document.getElementById("tvProblem") ? document.getElementById("tvProblem").value : "";
    var cdate = document.getElementById("appointmentDate") ? document.getElementById("appointmentDate").value : "";

    // validation
    if (cname === "" || cphone === "" || caddress === "" || ctvbrand === "" || ctvinches === "" || cdate === "") {
      // alert("Please fill in all required fields.");
      alertbox.render({
        alertIcon: 'error',
        title: 'Error!',
        message: 'Please fill in all required fields.',
        btnTitle: 'Ok',
        border: true
      });
      return;
    }

    // Default values
    var cid = Math.floor(Math.random() * 1000000); // generate random id
    var currentDate = new Date().toISOString().split('T')[0];
    var cstatus = "Pending";
    var serves_cost = "0";
    var Solved_date = "Not Solved";
    var source_of_reper = "Web Form";

    // Setup data
    const data = {
      "id": cid,
      "date": currentDate,
      "name": cname,
      "tvname": ctvbrand,
      "phone_number": cphone,
      "address": caddress,
      "tv_inches": ctvinches,
      "appoinment_date": cdate,
      "Problem": cproblem,
      "Status": cstatus,
      "serves_cost": serves_cost,
      "Solved_date": Solved_date,
      "source_of_reper": source_of_reper
    };

    // Send request using POST method with JSON body
    // The GAS script uses JSON.parse(e.postData.contents), so we MUST send a JSON string.
    // We use mode: 'no-cors' to avoid CORS/Network errors common with GAS on local files
    // We use Content-Type: "text/plain" to avoid the browser sending an OPTIONS preflight request which often fails with GAS
    const url = "https://script.google.com/macros/s/AKfycbwA_oDaeJhFbXySY6SXXf9iXCZAyrgijAOUsPJgy4iTV5yM7alx2p7kVavqK3V2eULJ/exec";

    fetch(url, {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        // With no-cors, we get an opaque response, so we can't check .ok or .text()
        // We assume it worked.
        console.log("Request sent (no-cors mode)");

        // Show success UI
        const form = document.querySelector("form");
        if (form) {
          const container = form.parentElement;
          container.innerHTML = `
                <div class="text-center">
                    <i class="fa fa-check-circle text-success display-1 mb-4"></i>
                    <h1 class="mb-3">Appointment Booked!</h1>
                    <p class="mb-4">Thank you for booking with us. We will contact you shortly.</p>
                    <a href="index.html" class="btn btn-primary py-3 px-5">Go Back Home</a>
                </div>
            `;
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        alert("Submission possibly failed: " + error);
      });
  } catch (err) {
    console.error(err);
    alert("An internal error occurred: " + err.message);
  }
}



