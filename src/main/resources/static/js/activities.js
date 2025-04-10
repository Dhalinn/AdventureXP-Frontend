document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/activities")
        .then(response => response.json())
        .then(data => {
            const activityTable = document.getElementById("activityTable");
            activityTable.innerHTML = "";

            data.forEach(activity => {
                let row = `<tr>
                    <td>${activity.name}</td>
                    <td>${activity.description}</td>
                    <td>${activity.ageLimit}</td>
                    <td>${activity.price} DKK</td>
                    <td><a href="/booking.html?activityId=${activity.id}">Book Nu!</a></td>
                </tr>`;
                activityTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching activities:", error));
});
