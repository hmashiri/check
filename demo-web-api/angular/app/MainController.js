(function() {
    'use strict';

    angular
        .module('app', [])
        .controller('MainController', MainController);

    MainController.$inject = ['$http', 'ToDoFactory'];

    /* @ngInject */
    function MainController($http, ToDoFactory) {
        var vm = this;

        vm.TodoItems = [];
        vm.prioritySelected = '1';

        activate();

        ////////////////

        function activate() {

            ToDoFactory.getToDo().then(

                function(response) {

                    vm.TodoItems = response;

                }

            );
        }



        vm.addItems = function() {

            var todoListItems = {
                // isDone: parseInt(vm.prioritySelected, 10),
                description: vm.userTaskDesInput,
                dueDate: vm.userTaskNameInput
            };

            ToDoFactory.AddTodoToDatabase(todoListItems).then(

                function(response) {

                    todoListItems.todoId = response.todoId;
                    vm.TodoItems.push(todoListItems);

                })

         
        };

    }
})();
