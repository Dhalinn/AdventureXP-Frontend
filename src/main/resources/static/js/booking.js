document.addEventListener("DOMContentLoaded", function () {
    const activityDropdown = document.getElementById("activityDropdown");

    fetch("http://localhost:8080/api/activities")
        .then(response => response.json())
        .then(data => {
            activityDropdown.innerHTML = "";
            data.forEach(activity => {
                let option = document.createElement("option");
                option.value = activity.id;
                option.textContent = activity.name;
                activityDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching activities:", error));

    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        const bookingData = {
            userName: document.getElementById("userName").value,
            userEmail: document.getElementById("userEmail").value,
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
    const userEmail = document.getElementById("userEmail").value.trim();
    const reservationTime = document.getElementById("reservationTime").value;

    if (userName === "" || userEmail === "" || reservationTime === "") {
        alert("Feltet skal udfyldes");
        event.preventDefault(); // Stop form submission
        return;
    }


});
