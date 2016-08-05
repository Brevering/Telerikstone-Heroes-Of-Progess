(function () {

    define([], function () {
        function showTopUsers(data) {
            let chart;

            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();
            chart.dataProvider = data;
            chart.categoryField = "username";
            chart.startDuration = 1;
            chart.plotAreaBorderColor = "#DADADA";
            chart.plotAreaBorderAlpha = 1;
            // this single line makes the chart a bar chart
            chart.rotate = true;

            // AXES
            // Category
            let categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = "start";
            categoryAxis.gridAlpha = 0.1;
            categoryAxis.axisAlpha = 0;

            // Value
            let valueAxis = new AmCharts.ValueAxis();
            valueAxis.axisAlpha = 0;
            valueAxis.gridAlpha = 0.1;
            valueAxis.position = "top";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            // first graph
            let graph1 = new AmCharts.AmGraph();
            graph1.type = "column";
            graph1.title = "Wins";
            graph1.valueField = "wins";
            graph1.balloonText = "Wins:[[value]]";
            graph1.lineAlpha = 0;
            graph1.fillColors = "#ADD981";
            graph1.fillAlphas = 1;
            chart.addGraph(graph1);

            // second graph
            let graph2 = new AmCharts.AmGraph();
            graph2.type = "column";
            graph2.title = "Defeats";
            graph2.valueField = "defeats";
            graph2.balloonText = "Defeats:[[value]]";
            graph2.lineAlpha = 0;
            graph2.fillColors = "#81acd9";
            graph2.fillAlphas = 1;
            chart.addGraph(graph2);

            // LEGEND
            let legend = new AmCharts.AmLegend();
            chart.addLegend(legend);

            //chart.creditsPosition = "top-right";
            chart.write("chartdiv");
        }

        function showMyStats(data) {
            let chartData = [{
                'userData': data.wins,
                'statName': 'wins'
            }, {
                'userData': data.defeats,
                'statName': 'defeats'
            }];

            // PIE CHART
            chart = new AmCharts.AmPieChart();

            // title of the chart
            chart.addTitle("Player statistics", 16);

            chart.dataProvider = chartData;
            chart.titleField = "statName";
            chart.valueField = "userData";
            chart.sequencedAnimation = true;
            chart.startEffect = "elastic";
            chart.innerRadius = "30%";
            chart.startDuration = 2;
            chart.labelRadius = 15;
            chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
            // the following two lines makes the chart 3D
            chart.depth3D = 10;
            chart.angle = 15;

            // WRITE
            chart.write("chartdiv");
        }

        return {
            showTopUsers: showTopUsers,
            showMyStats: showMyStats
        };
    });
}());