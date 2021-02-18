function drawFromStdNormal() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function generateNormalSequence(length) {
    var randomSeq = Array(length).fill().map((element, index) => drawFromStdNormal());
    randomSeq[0] = 0;

    return randomSeq;
}

function createCumulativeSequence(length) {
    var i;
    var cumulRandomSeq = []

    var randomSeq = Array(length).fill().map((element, index) => drawFromStdNormal());

    cumulRandomSeq[0] = 1

    for (i = 1; i < length; i++) {
        // cumulRandomSeq[i] = cumulRandomSeq[i-1] * (1+randomSeq[i]);
        cumulRandomSeq[i] = cumulRandomSeq[i - 1] + randomSeq[i];
    }

    return cumulRandomSeq
}

function getMinOrMaxOfData(data, func) {
    var temp = [];

    data.forEach(
        e => temp.push(func.apply(Math, e))
    );

    return func.apply(Math, temp);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array
}

function generateDatasets(numberOfSeqs) {
    var datasets = [];
    var series = [];

    var i;
    for (i = 0; i < numberOfSeqs; i++) {
        series[i] = createCumulativeSequence(seqLength);

        datasets[i] = {
            data: [
                series[i].slice(0, initSeqLength)
            ],
            fill: false,
            borderColor: colorPalette[i],
            pointRadius: 0
        }
    }

    return [series, datasets]
}

const seqLength = 400;
const initSeqLength = 1;
const colorPalette = ["#283d3b", "#197278", "#446768", "#6f5c57", "#9a5147", "#c44536", "#772e25"];
const nSeqs = 5;
const timer = 10;
const axisBuffer = 1.05;

var xAxis = Array(seqLength).fill().map((element, index) => index);
var [series, datasets] = generateDatasets(nSeqs);
var yAxisMin = axisBuffer * getMinOrMaxOfData(series,Math.min);
var yAxisMax = axisBuffer * getMinOrMaxOfData(series,Math.max);

var chartConfigs = {
    type: 'line',
    data: {
        labels: xAxis,
        datasets: datasets
    },
    options: {
        responsive: true,
        tooltips: {
            enabled: false
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    display: false,
                    min: yAxisMin,
                    max: yAxisMax
                },
                gridLines: {
                    display: false
                }
            }]
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById("chart");
    var coolChart = new Chart(ctx, chartConfigs);

    function buildTimeSeries(i) {

        var test = Array(nSeqs).fill().map((element, index) => series[index][i]);

        coolChart.data.datasets.forEach(function (dataset, index) {
            dataset.data.push(test[index]);
        });
        coolChart.update();
    }

    var counter = initSeqLength;

    var iterator = setInterval(function () {
        if (counter < seqLength) {
            buildTimeSeries(counter);
            counter++;
        } else {
            clearInterval(iterator);
        }
    }, timer);
};
