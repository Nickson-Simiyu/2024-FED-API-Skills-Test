document.addEventListener("DOMContentLoaded", function() {
    const url = 'https://fedskillstest.coalitiontechnologies.workers.dev';
    const username = 'coalition';
    const password = 'skills-test';
    const headers = new Headers({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    fetch(url, { method: 'GET', headers: headers })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            // Assuming data is structured correctly and contains the information you need
            const jessica = data.find(patient => patient.name === 'Jessica Taylor');
            if (jessica) {
                updateProfile(jessica);
            } else {
                console.error('Jessica Taylor not found in the data.');
            }
        })
        .catch(error => console.error('Fetch error:', error));

    function updateProfile(patient) {
        document.getElementById('profilePic').src = patient.profile_picture;
        document.getElementById('patientName').textContent = patient.name;
        document.getElementById('dob').textContent = patient.date_of_birth;
        document.getElementById('gender').textContent = patient.gender;
        document.getElementById('phone').textContent = patient.phone_number;
        document.getElementById('emergencyContact').textContent = patient.emergency_contact;
        document.getElementById('insurance').textContent = patient.insurance_type;
    }
});




const Utils = {
    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        blue: 'rgb(54, 162, 235)',
        green: 'rgb(75, 192, 192)',
    }
};

const labels = ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'];
const datapoints1 = [120, 118, 160, 116, 150, 160];
const datapoints2 = [110, 68, 110, 90, 70, 78];

const data = {
    labels: labels,
    datasets: [
    {
        label: 'Systolic',
        data: datapoints1,
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.CHART_COLORS.red,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: Utils.CHART_COLORS.red,
    },
    {
        label: 'Diastolic',
        data: datapoints2,
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.CHART_COLORS.blue,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: Utils.CHART_COLORS.blue,
    }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
        title: {
            display: true,
            text: 'Blood Pressure',
            align: 'start',
        }
        },
        interaction: {
            intersect: false,
        },
        scales: {
        x: {
            display: true,
            title: {
                display: true
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Value'
            },
            min: 60,
            max: 180,
            ticks: {
                stepSize: 20
            }
        }
        }
    }
};

window.onload = function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, config);
};