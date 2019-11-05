$.get("/api/percents", function (res) {
    // if (err) throw err;
    console.log(res);
    var labels = [];
    var data = [];
    for (i = 0; i < res.length; i++) {
        labels.push(res[i].source)
    }
    for (i = 0; i < res.length; i++) {
        data.push(res[i].percent)
    }
    let myChart = document.getElementById('myChart').getContext('2d');

    let massPopChart = new Chart(myChart, {
        type: 'pie', // bar, pie, etc.
        data: {
            // X data. 
            labels,
            datasets: [{
                label: 'Spending',
                data,
                // Background color for induvidual labels.
                backgroundColor: [
                    'rgba(72, 201, 176, 0.6)',
                    'rgba(192, 57, 43, 0.6)',
                    'rgba(142, 68, 173, 0.6)',
                    'rgba(244, 208, 63, 0.6)',
                    'rgba(220, 118, 51, 0.6)',
                    'rgba(52, 73, 94, 0.6)',
                ],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '#000',
            }
        },

    });
})

