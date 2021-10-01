<%--
  Created by IntelliJ IDEA.
  User: forcewave
  Date: 2021-10-01
  Time: 오전 10:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>Chart Sample</title>
    <META charset="UTF-8">
    <!-- Resources -->
    <script src="/js/amChart/core.js"></script>
    <script src="/js/amChart/charts.js"></script>
    <script src="/js/amChart/animated.js"></script>
    <script src="/js/view/index.js"></script>

  </head>
  <style>
    #chartdiv {
      width: 100%;
      height: 500px;
    }
  </style>
  <body>

  <input type="button" value="막대차트" onclick="chart.init('chartdiv','XYChart3D','stick');">
  <input type="button" value="파이차트" onclick="chart.init('chartdiv','PieChart3D','vh3Dpie');">
  <input type="button" value="라인차트" onclick="chart.init('chartdiv','XYChart','line2chart');">
  <div id="chartdiv"></div>

  </body>
</html>
