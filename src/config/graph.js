const root = getComputedStyle(document.body);

const getGraphOptions = (hideLegend, hideAxes, adjustedPadding) => ({
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
        align: 'end',
        display: !hideLegend,
        labels: {
            usePointStyle: true,
            fontFamily: 'Montserrat',
            fontColor: root.getPropertyValue('--color-2-dark')
        }
    },
    ...(!hideAxes && {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                    color: root.getPropertyValue('--color-2-darker'),
                },
                ticks: {
                    fontFamily: 'Montserrat',
                    fontColor: root.getPropertyValue('--color-2-dark')
                }
            }],
            yAxes: [{
                offset: true,
                gridLines: {
                    display: false,
                    color: root.getPropertyValue('--color-2-darker'),
                },
                ticks: {
                    stepSize: 1,
                    maxTicksLimit: 7,
                    fontFamily: 'Montserrat',
                    fontColor: root.getPropertyValue('--color-2-dark')
                }
            }]
        }
    }),
    layout: {
        padding: {
            top: adjustedPadding ? 50 : 25,
            right: adjustedPadding ? 50 : 25,
            bottom: 25,
            left: 25
        }
    }
});

const getLineOptions = (ctx, fill) => {
    const gradientStroke = ctx.createLinearGradient(0, 0, 1200, 0);
    gradientStroke.addColorStop(0, root.getPropertyValue('--color-6'));
    gradientStroke.addColorStop(0.3, root.getPropertyValue('--color-7'));
    gradientStroke.addColorStop(0.6, root.getPropertyValue('--color-8'));
    gradientStroke.addColorStop(1, root.getPropertyValue('--color-9'));
    
    const gradientFill = ctx.createLinearGradient(0, 0, 1200, 0);
    gradientFill.addColorStop(0, root.getPropertyValue('--color-6-opacity'));
    gradientFill.addColorStop(0.3, root.getPropertyValue('--color-7-opacity'));
    gradientFill.addColorStop(0.6, root.getPropertyValue('--color-8-opacity'));
    gradientFill.addColorStop(0, root.getPropertyValue('--color-9-opacity'));
    
    return {
        type: 'line',
        fill,
        borderWidth: 4,
        pointRadius: 4,
        borderColor: gradientStroke,
        pointBorderColor: gradientStroke,
        pointBackgroundColor: gradientStroke,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        backgroundColor: gradientFill
    };
};

const getBarOptions1 = () => ({
    backgroundColor: root.getPropertyValue('--color-8'),
    hoverBackgroundColor: root.getPropertyValue('--color-8')
});

const getBarOptions2 = () => ({
    backgroundColor: root.getPropertyValue('--color-9'),
    hoverBackgroundColor: root.getPropertyValue('--color-9')
});

const getDoughnutOptions = () => ({
    borderWidth: 0,
    backgroundColor: [
        root.getPropertyValue('--color-7'),
        root.getPropertyValue('--color-7-opacity'),
        root.getPropertyValue('--color-8'),
        root.getPropertyValue('--color-9'),
        root.getPropertyValue('--color-9-opacity'),
        root.getPropertyValue('--color-5-lighter'),
        root.getPropertyValue('--color-2-dark'),
    ],
    hoverBackgroundColor: [
        root.getPropertyValue('--color-7'),
        root.getPropertyValue('--color-7-opacity'),
        root.getPropertyValue('--color-8'),
        root.getPropertyValue('--color-9'),
        root.getPropertyValue('--color-9-opacity'),
        root.getPropertyValue('--color-5-lighter'),
        root.getPropertyValue('--color-2-dark'),
    ]
});

export default { getGraphOptions, getLineOptions, getBarOptions1, getBarOptions2, getDoughnutOptions }