const getGraphOptions = (hideLegend, hideAxes) => ({
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: !hideLegend,
        labels: {
            fontFamily: 'Montserrat',
            fontColor: '#5B6F8C'
        }
    },
    ...(!hideAxes && {
        scales: {
            xAxes: [{
                // offset: true,
                gridLines: {
                    display: false,
                    color: '#E5ECF9',
                },
                ticks: {
                    fontFamily: 'Montserrat',
                    fontColor: '#5B6F8C'
                }
            }],
            yAxes: [{
                // offset: true,
                gridLines: {
                    display: false,
                    color: '#E5ECF9',
                },
                ticks: {
                    stepSize: 1,
                    fontFamily: 'Montserrat',
                    fontColor: '#5B6F8C'
                }
            }]
        }
    }),
    layout: {
        padding: {
            top: 25,
            right: 25,
            bottom: 25,
            left: 25
        }
    }
});

const lineOptions = {
    type: 'line',
    fill: false,
    backgroundColor: '#7bd6fd',
    borderColor: '#7bd6fd',
    borderWidth: 4,
    pointRadius: 4
};

const barOptions1 = {
    backgroundColor: 'purple'
};

const barOptions2 = {
    backgroundColor: '#ffa3ef'
};

export default { getGraphOptions, lineOptions, barOptions1, barOptions2 }