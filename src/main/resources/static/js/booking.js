document.addEventListener("DOMContentLoaded", function () {
    const activityDropdown = document.getElementById("activityDropdown");

    const urlParams = new URLSearchParams(window.location.search);
    const selectedActivityId = urlParams.get("activityId"); // selekter automatisk en aktivitet til url linket booking

    fetch("http://localhost:8080/api/activities")
        .then(response => response.json())
        .then(data => {
            activityDropdown.innerHTML = "";
            data.forEach(activity => {
                let option = document.createElement("option");
                option.value = activity.id;
                option.textContent = activity.name;
                if (activity.id === selectedActivityId) {
                    option.selected = true; //hvis aktiviteten matcher url parameter
                }
                activityDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching activities:", error));

    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault(); //

        const bookingData = {
            userName: document.getElementById("userName").value,
            userNumber: document.getElementById("userNumber").value,
            activityId: activityDropdown.value,
            reservationTime: document.getElementById("reservationTime").value
        };

        fetch("http://localhost:8080/api/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        })
            .then(response => response.json())
            .then(data => alert("Booking confirmed!"))
            .catch(error => console.error("Error submitting booking:", error));
    });
});
document.getElementById("bookingForm").addEventListener("submit", function (event) {
    const userName = document.getElementById("userName").value.trim();
    const userNumber = document.getElementById("userNumber").value.trim();
    const reservationTime = document.getElementById("reservationTime").value;

    if (userName === "" || userNumber === "" || reservationTime === "") {
        alert("Feltet skal udfyldes");
        event.preventDefault();
        return;
    }


});
