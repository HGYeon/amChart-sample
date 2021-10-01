/*
* @param target chart가 출력 될 element id
*        chartType amChart에 정의된 차트 타입
*        definedType  직접 정의한 차트 타입
*        data 데이터
* */
let chart  = {
    init : (target,chartType,definedType,data) => {
        am4core.ready( () => {
            am4core.useTheme(am4themes_animated);
            let chartElement = am4core.create(target, am4charts[`${chartType}`]);
            chart.chartTyps[`${definedType}`](chartElement,data);
        }); // end am4core.ready()
    },
    chartTyps : { // 차트 별 속성 정의
        line2chart : (chartElement,data) =>{  // 두 값 비교 라인 차트
            if(typeof data !== 'undefined'){
                chartElement.data = data;
            }else {
                chartElement.data = [
                    {date:new Date(2019,5,12), value1:50, value2:48, previousDate:new Date(2019, 5, 5)},
                    {date:new Date(2019,5,13), value1:53, value2:51, previousDate:new Date(2019, 5, 6)},
                    {date:new Date(2019,5,14), value1:56, value2:58, previousDate:new Date(2019, 5, 7)},
                    {date:new Date(2019,5,15), value1:52, value2:53, previousDate:new Date(2019, 5, 8)},
                    {date:new Date(2019,5,16), value1:48, value2:44, previousDate:new Date(2019, 5, 9)},
                    {date:new Date(2019,5,17), value1:47, value2:42, previousDate:new Date(2019, 5, 10)},
                    {date:new Date(2019,5,18), value1:59, value2:55, previousDate:new Date(2019, 5, 11)}
                ];
            }

            // Create axes
            let dateAxis = chartElement.xAxes.push(new am4charts.DateAxis());
                dateAxis.renderer.minGridDistance = 50;

            let valueAxis = chartElement.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = chartElement.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "value1";
                series.dataFields.dateX = "date";
                series.strokeWidth = 2;
                series.minBulletDistance = 10;
                series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
                series.tooltip.pointerOrientation = "vertical";

            // Create series
            let series2 = chartElement.series.push(new am4charts.LineSeries());
                series2.dataFields.valueY = "value2";
                series2.dataFields.dateX = "date";
                series2.strokeWidth = 2;
                series2.strokeDasharray = "3,4";
                series2.stroke = series.stroke;

            // Add cursor
            chartElement.cursor = new am4charts.XYCursor();
            chartElement.cursor.xAxis = dateAxis;
        },
        vh3Dpie : (chartElement,data) => { // 가변 높이 3D 파이 차트
            chartElement.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chartElement.innerRadius = am4core.percent(40);
            chartElement.depth = 120;

            chartElement.legend = new am4charts.Legend();
            if(typeof data !== 'undefined'){
                chartElement.data = data;
            }else {
                chartElement.data = [
                    {
                        country: "Lithuania",
                        litres: 501.9
                    },
                    {
                        country: "Czech Republic",
                        litres: 301.9
                    },
                    {
                        country: "Ireland",
                        litres: 201.1
                    },
                    {
                        country: "Germany",
                        litres: 165.8
                    },
                    {
                        country: "Australia",
                        litres: 139.9
                    },
                    {
                        country: "Austria",
                        litres: 128.3
                    }
                ];
            }
            let series = chartElement.series.push(new am4charts.PieSeries3D());
                series.dataFields.value = "litres";
                series.dataFields.depthValue = "litres";
                series.dataFields.category = "country";
                series.slices.template.cornerRadius = 5;
                series.colors.step = 3;
        },
        stick : (chartElement,data) => {
            chartElement.paddingBottom = 30;
            chartElement.angle = 35;
            if(typeof data !== 'undefined'){
                chartElement.data = data;
            }else {
                chartElement.data = [{
                    "country": "USA",
                    "visits": 4025
                }, {
                    "country": "China",
                    "visits": 1882
                }, {
                    "country": "Japan",
                    "visits": 1809
                }, {
                    "country": "Germany",
                    "visits": 1322
                }, {
                    "country": "UK",
                    "visits": 1122
                }, {
                    "country": "France",
                    "visits": 1114
                }, {
                    "country": "India",
                    "visits": 984
                }, {
                    "country": "Spain",
                    "visits": 711
                }, {
                    "country": "Netherlands",
                    "visits": 665
                }, {
                    "country": "Russia",
                    "visits": 580
                }, {
                    "country": "South Korea",
                    "visits": 443
                }, {
                    "country": "Canada",
                    "visits": 441
                }, {
                    "country": "Brazil",
                    "visits": 395
                }, {
                    "country": "Italy",
                    "visits": 386
                }, {
                    "country": "Taiwan",
                    "visits": 338
                }];
            }
            // Create axes
            let categoryAxis = chartElement.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 20;
                categoryAxis.renderer.inside = true;
                categoryAxis.renderer.grid.template.disabled = true;

            let labelTemplate = categoryAxis.renderer.labels.template;
                labelTemplate.rotation = -90;
                labelTemplate.horizontalCenter = "left";
                labelTemplate.verticalCenter = "middle";
                labelTemplate.dy = 10; // moves it a bit down;
                labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

            let valueAxis = chartElement.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.grid.template.disabled = true;

            // Create series
            let series = chartElement.series.push(new am4charts.ConeSeries());
                series.dataFields.valueY = "visits";
                series.dataFields.categoryX = "country";

            let columnTemplate = series.columns.template;
                columnTemplate.adapter.add("fill", (fill, target) =>{
                return chartElement.colors.getIndex(target.dataItem.index);
            });

                columnTemplate.adapter.add("stroke", (stroke, target) => {
                return chartElement.colors.getIndex(target.dataItem.index);
            })

        }
    }
};