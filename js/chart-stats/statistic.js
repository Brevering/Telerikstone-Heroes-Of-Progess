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
            var categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = "start";
            categoryAxis.gridAlpha = 0.1;
            categoryAxis.axisAlpha = 0;

            // Value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.axisAlpha = 0;
            valueAxis.gridAlpha = 0.1;
            valueAxis.position = "top";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            // first graph
            var graph1 = new AmCharts.AmGraph();
            graph1.type = "column";
            graph1.title = "Wins";
            graph1.valueField = "wins";
            graph1.balloonText = "Wins:[[value]]";
            graph1.lineAlpha = 0;
            graph1.fillColors = "#ADD981";
            graph1.fillAlphas = 1;
            chart.addGraph(graph1);

            // second graph
            var graph2 = new AmCharts.AmGraph();
            graph2.type = "column";
            graph2.title = "Defeats";
            graph2.valueField = "defeats";
            graph2.balloonText = "Defeats:[[value]]";
            graph2.lineAlpha = 0;
            graph2.fillColors = "#81acd9";
            graph2.fillAlphas = 1;
            chart.addGraph(graph2);

            // LEGEND
            var legend = new AmCharts.AmLegend();
            chart.addLegend(legend);

            chart.creditsPosition = "top-right";

            // WRITE
            chart.write("chartdiv");
            //hide window stats
            $('#chartdiv').on('click', function () {
                $('#chartdiv').hide();
            });
        }
        function showMyStats(data) {
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
            var categoryAxis = chart.categoryAxis;
            categoryAxis.gridPosition = "start";
            categoryAxis.gridAlpha = 0.1;
            categoryAxis.axisAlpha = 0;

            // Value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.axisAlpha = 0;
            valueAxis.gridAlpha = 0.1;
            valueAxis.position = "top";
            chart.addValueAxis(valueAxis);

            // GRAPHS
            // first graph
            var graph1 = new AmCharts.AmGraph();
            graph1.type = "column";
            graph1.title = "Wins";
            graph1.valueField = "wins";
            graph1.balloonText = "Wins:[[value]]";
            graph1.lineAlpha = 0;
            graph1.fillColors = "#ADD981";
            graph1.fillAlphas = 1;
            chart.addGraph(graph1);

            // second graph
            var graph2 = new AmCharts.AmGraph();
            graph2.type = "column";
            graph2.title = "Defeats";
            graph2.valueField = "defeats";
            graph2.balloonText = "Defeats:[[value]]";
            graph2.lineAlpha = 0;
            graph2.fillColors = "#81acd9";
            graph2.fillAlphas = 1;
            chart.addGraph(graph2);

            // LEGEND
            var legend = new AmCharts.AmLegend();
            chart.addLegend(legend);

            chart.creditsPosition = "top-right";

            // WRITE
            chart.write("chartdiv");
            //hide window stats
            $('#chartdiv').on('click', function () {
                $('#chartdiv').hide();
            });
        }

        return {
            showTopUsers: showTopUsers,
            showMyStats: showMyStats
        };
    });
} ());