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
            graph1.fillColors = "#50e40c";
            graph1.fillAlphas = 1;
            chart.addGraph(graph1);

            // second graph
            let graph2 = new AmCharts.AmGraph();
            graph2.type = "column";
            graph2.title = "Defeats";
            graph2.valueField = "defeats";
            graph2.balloonText = "Defeats:[[value]]";
            graph2.lineAlpha = 0;
            graph2.fillColors = "#ef2525";
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

        function endGameChart(chartData) {
            let chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = "player";
            chart.startDuration = 1;
            chart.plotAreaBorderColor = "#DADADA";
            chart.plotAreaBorderAlpha = 1;
            chart.rotate = true;

            let categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = "start";
            categoryAxis.gridAlpha = 0.1;
            categoryAxis.axisAlpha = 0;

            let valueAxis = new AmCharts.ValueAxis();
            valueAxis.axisAlpha = 0;
            valueAxis.gridAlpha = 0.1;
            valueAxis.position = "top";
            chart.addValueAxis(valueAxis);

            let graph1 = new AmCharts.AmGraph();
            graph1.type = "column";
            graph1.title = "Damage dealt";
            graph1.valueField = "damageDealt";
            graph1.balloonText = "Damage dealt:[[value]]";
            graph1.lineAlpha = 0;
            graph1.fillColors = "#ef7c25";
            graph1.fillAlphas = 1;
            chart.addGraph(graph1);

            let graph2 = new AmCharts.AmGraph();
            graph2.type = "column";
            graph2.title = "Health stolen";
            graph2.valueField = "healthStolen";
            graph2.balloonText = "Health stolen:[[value]]";
            graph2.lineAlpha = 0;
            graph2.fillColors = "#d51d10";
            graph2.fillAlphas = 1;
            chart.addGraph(graph2);

            let graph3 = new AmCharts.AmGraph();
            graph3.type = "column";
            graph3.title = "Mana stolen";
            graph3.valueField = "manaStolen";
            graph3.balloonText = "Mana stolen:[[value]]";
            graph3.lineAlpha = 0;
            graph3.fillColors = "#2a4eef";
            graph3.fillAlphas = 1;
            chart.addGraph(graph3);

            let graph4 = new AmCharts.AmGraph();
            graph4.type = "column";
            graph4.title = "Attack stolen";
            graph4.valueField = "attackStolen";
            graph4.balloonText = "Attack stolen:[[value]]";
            graph4.lineAlpha = 0;
            graph4.fillColors = "#efb72a";
            graph4.fillAlphas = 1;
            chart.addGraph(graph4);

            let legend = new AmCharts.AmLegend();
            chart.addLegend(legend);
            chart.write("end-game-chart");
        }

        return {
            showTopUsers: showTopUsers,
            showMyStats: showMyStats,
            endGameChart: endGameChart
        };
    });
}());