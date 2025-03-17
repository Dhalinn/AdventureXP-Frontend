document.addEventListener("DOMContentLoaded", function () {
    loadEmployees();
    loadReservations();


    document.getElementById("addEmployeeForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const newEmployee = {
            name: document.getElementById("employeeName").value,
            email: document.getElementById("employeeEmail").value,
            role: document.getElementById("employeeRole").value
        };

        fetch("http://localhost:8080/api/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEmployee)
        })
            .then(response => response.json())
            .then(() => {
                alert("Employee added!");
                loadEmployees();
            })
            .catch(error => console.error("Error adding employee:", error));
    });
});


function loadEmployees() {
    fetch("http://localhost:8080/api/employees")
        .then(response => response.json())
        .then(data => {
            const employeeTable = document.getElementById("employeeTable");
            employeeTable.innerHTML = "";

            data.forEach(employee => {
                let row = `<tr>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.role}</td>
                    <td>
                        <button onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                </tr>`;
                employeeTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching employees:", error));
}


function deleteEmployee(employeeId) {
    fetch(`http://localhost:8080/api/employees/${employeeId}`, { method: "DELETE" })
        .then(() => {
            alert("Employee deleted!");
            loadEmployees();
        })
        .catch(error => console.error("Error deleting employee:", error));
}


function loadReservations() {
    fetch("http://localhost:8080/api/reservations")
        .then(response => response.json())
        .then(data => {
            const reservationTable = document.getElementById("reservationTable");
            reservationTable.innerHTML = "";

            data.forEach(reservation => {
                let row = `<tr>
                    <td>${reservation.user.name}</td>
                    <td>${reservation.user.email}</td>
                    <td>${reservation.activity.name}</td>
                    <td>${reservation.reservationTime}</td>
                    <td>
                        <button onclick="deleteReservation(${reservation.id})">Cancel</button>
                    </td>
                </tr>`;
                reservationTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching reservations:", error));
}


function deleteReservation(reservationId) {
    fetch(`http://localhost:8080/api/reservations/${reservationId}`, { method: "DELETE" })
        .then(() => {
            alert("Reservation canceled!");
            loadReservations();
        })
        .catch(error => console.error("Error canceling reservation:", error));
}
