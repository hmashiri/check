(function() {
    'use strict';

    // var RequestService = new function()
    // {
    //     this.HEADERS = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    // };

    // Object.freeze( RequestService );

    angular
        .module('app')
        .factory('ToDoFactory', ToDoFactory);

    ToDoFactory.$inject = ['$http', 'TodoesAPI', '$q'];

    /* @ngInject */
    function ToDoFactory($http, TodoesAPI, $q) {
        var service = {
            getToDo: getToDo,
            AddTodoToDatabase: AddTodoToDatabase,
          
        };
        return service;

        ////////////////

        function getToDo() {

            var defer = $q.defer();

            $http({

                method: 'GET',
                url: TodoesAPI + 'items'


            }).then(function(response) {

                    if (typeof response.data === 'object') {

                        defer.resolve(response.data);

                    } else {

                        defer.reject(response);
                    }

                },

                function(error) {

                    defer.reject(error);

                });

            return defer.promise;
        }


        function AddTodoToDatabase(todoListItems) {

            var defer = $q.defer();
            var params = $.param(
            {
                    
                    Description: todoListItems.description,
                    DueDate: todoListItems.dueDate,
                    isDone: false,
            });


            $http({

                method: 'POST',
                url: TodoesAPI + 'item',
                data: params,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }

            }).then(function(response) {

                    if (typeof response.data === "object") {

                        defer.resolve(response.data);

                    } else {

                        defer.reject(response);
                    }

                },

                function(error) {

                    defer.reject(error);

                });

            return defer.promise;
        }


    }
})();
