var app = angular.module('AngularD3Demo', []);

app.value('LineChartVisualization', LineChart);
app.value('d3js', d3);

app.directive('visualization', function(d3js) {
    return {
        restrict: 'E',
        scope: {
            'vis': '=',
            'data': '=',
        },
        link: function(scope, element, attrs, controller) {
            function valueDidChange() {
                if (scope.data && scope.vis)
                {
                    d3js.select(element[0]).select('svg').remove();
                    d3js.select(element[0])
                        .datum(scope.data)
                        .call(scope.vis);
                }
            }

            scope.$watch('vis', valueDidChange);
            scope.$watch('data', valueDidChange);
        }
    };
});

app.controller('ExampleController', function($scope, LineChartVisualization) {
    $scope.barChart = LineChartVisualization()
                            .width(600)
                            .height(400);
    
    $scope.sampleData = [10, 13, 145];
});

app.controller('ValueEditController', function($scope) {
    
});
