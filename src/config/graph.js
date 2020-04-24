const getGraphOptions = (hideGrid, hideLegend, addPadding) => ({
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: !hideLegend,
        labels: {
            fontFamily: 'Montserrat',
            fontColor: '#5B6F8C'
        }
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: !hideGrid,
                color: '#E5ECF9',
            },
            ticks: {
                fontFamily: 'Montserrat',
                fontColor: '#5B6F8C'
            }
        }],
        yAxes: [{
            gridLines: {
                display: !hideGrid,
                zeroLineWidth: 0,
                color: '#E5ECF9',
            },
            ticks: {
                stepSize: 1,
                fontFamily: 'Montserrat',
                fontColor: '#5B6F8C'
            }
        }]
    },
    layout: {
        padding: {
            top: addPadding ? 25 : 0,
            right: addPadding ? 25 : 0,
            bottom: addPadding ? 25 : 0,
            left: addPadding ? 25 : 0
        }
    }
});

const lineOptions = {
    type: 'line',
    fill: false,
    backgroundColor: '#7bd6fd',
    borderColor: '#7bd6fd',
    borderWidth: 5,
    pointRadius: 5
};

const barOptions1 = {
    backgroundColor: 'purple'
};

const barOptions2 = {
    backgroundColor: '#ffa3ef'
};

export default { getGraphOptions, lineOptions, barOptions1, barOptions2 }