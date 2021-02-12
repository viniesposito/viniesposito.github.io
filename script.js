function drawFromStdNormal() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
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

    for (i=1; i<length; i++) {
        // cumulRandomSeq[i] = cumulRandomSeq[i-1] * (1+randomSeq[i]);
        cumulRandomSeq[i] = cumulRandomSeq[i-1] + randomSeq[i];
    }

    return cumulRandomSeq
}

var seqLength = 500;
var initSeqLength = 1;
var xAxis = Array(seqLength).fill().map((element, index) => index);
// var cumulSeq = createCumulativeSequence(seqLength);
// var cumulSeq2 = createCumulativeSequence(seqLength);

var colorPalette = ["#283d3b","#197278","#446768","#6f5c57","#9a5147","#c44536","#772e25"];

console.log(colorPalette);
function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array
}
console.log(shuffleArray(colorPalette));

function generateDatasets(numberOfSeqs){
    var datasets = [];
    var series = [];

    var i;
    for (i=0; i < numberOfSeqs; i++) {
        series[i] = createCumulativeSequence(seqLength);

        datasets[i] = { 
            data: [
                series[i].slice(0,initSeqLength)
        ],
            fill:false,
            borderColor: colorPalette[i],
            pointRadius:0
        }
    }

    return [series, datasets]
}

var nSeqs = 3;
var [series, datasets] = generateDatasets(nSeqs);

// var datasets = [
//     { 
//         data: [
//             createCumulativeSequence(seqLength).slice(0,initSeqLength)
//     ],
//         fill:false,
//         borderColor:"#102a54",
//         pointRadius:0
//     }, { 
//         data: [
//             createCumulativeSequence(seqLength).slice(0,initSeqLength)
//         ],
//         fill:false,
//         borderColor:"#4bf542",
//         pointRadius:0
//     }   
// ]

var chartConfigs = {
    type: 'line',
    data: {
    // labels: xAxis.slice(0,initSeqLength),
        labels: xAxis,
        datasets: datasets
    },
    options: {
    responsive:true,
    tooltips: {
        enabled: false
    },
    legend: {
          display:false
      },
      scales: {
        xAxes: [{
            ticks: {
                display: false
            },
            gridLines: {
                display:false
            }
        }],
        yAxes: [{
            ticks: {
                display: false
            },
            gridLines: {
                display:false
            }
        }]
    }
  }
};

// function addData(chart, label, newData) {
//     chart.data.datasets.push({
//     label: [label],
//     data: [newData]
// });
// chart.update();
// }

window.onload = function() {
    var ctx = document.getElementById("chart");
    var coolChart = new Chart(ctx, chartConfigs);

    function buildTimeSeries(i){ 
        // var newLabel = xAxis[i];
        // var newEntry = cumulSeq[i];
        // var newEntry2 = cumulSeq2[i];
        // var test = [newEntry,newEntry2];
        var test = Array(nSeqs).fill().map((element, index) => series[index][i]);
        // coolChart.data.labels.push(newLabel);
        // coolChart.data.datasets[0].data.push(newEntry);
        // coolChart.data.datasets[1].data.push(newEntry2);
        coolChart.data.datasets.forEach(function (dataset, index) {
            dataset.data.push(test[index]);
        });
        coolChart.update();
    }

    var counter = initSeqLength;

    var iterator = setInterval(function(){
        if (counter<seqLength){
            buildTimeSeries(counter);
            counter++;
        } else {
            clearInterval(iterator);
        }
    }, 1);
};
