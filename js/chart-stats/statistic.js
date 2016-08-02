(function () {

    define(['jquery', 'sammy'], function ($, Sammy) {
        function showMyStatistics(data) {
            AmCharts.ready(function () {
                // SERIAL CHART
                var chart = new AmCharts.AmSerialChart();
                chart.dataProvider = data;
                chart.categoryField = "name";
                chart.startDuration = 1;
                // sometimes we need to set margins manually
                // autoMargins should be set to false in order chart to use custom margin values
                chart.autoMargins = false;
                chart.marginRight = 0;
                chart.marginLeft = 0;
                chart.marginBottom = 0;
                chart.marginTop = 0;

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.inside = true;
                categoryAxis.axisAlpha = 0;
                categoryAxis.gridAlpha = 0;
                categoryAxis.tickLength = 0;

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.minimum = 0;
                valueAxis.axisAlpha = 0;
                valueAxis.maximum = 80000;
                valueAxis.dashLength = 4;
                chart.addValueAxis(valueAxis);

                // GRAPH
                var graph = new AmCharts.AmGraph();
                graph.valueField = "points";
                graph.customBulletField = "bullet"; // field of the bullet in data provider
                graph.bulletOffset = 16; // distance from the top of the column to the bullet
                graph.colorField = "color";
                graph.bulletSize = 34; // bullet image should be rectangle (width = height)
                graph.type = "column";
                graph.fillAlphas = 0.8;
                graph.cornerRadiusTop = 8;
                graph.lineAlpha = 0;
                graph.balloonText = "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>";
                chart.addGraph(graph);

                // WRITE
                chart.write("chartdiv");
            });

        }
        function showTopUsers(data) {

            AmCharts.ready(function () {
                // SERIAL CHART
                chart = new AmCharts.AmSerialChart();
                chart.dataProvider = data;
                chart.categoryField = "name";
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
                graph1.title = "win";
                graph1.valueField = "win";
                graph1.balloonText = "win:[[value]]";
                graph1.lineAlpha = 0;
                graph1.fillColors = "#ADD981";
                graph1.fillAlphas = 1;
                chart.addGraph(graph1);

                // second graph
                var graph2 = new AmCharts.AmGraph();
                graph2.type = "column";
                graph2.title = "defeats";
                graph2.valueField = "defeats";
                graph2.balloonText = "defeats:[[value]]";
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
            });
        }
        return {
            showTopUsers: showTopUsers,
            showMyStatistics:showMyStatistics
        };
    });

} ());