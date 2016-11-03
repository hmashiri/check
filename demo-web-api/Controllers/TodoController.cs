using System;
using System.Collections.Generic;
using demo_web_api.Models;
using Microsoft.AspNetCore.Mvc;
 
namespace demo_web_api.Controllers
{
    public class ToDoController : Controller
    {
        static List<TodoItem> toDoItems = new List<TodoItem>();

        TodoRepository repo = new TodoRepository();
        [HttpGet()]
        [Route("api/todo/items")]
        public List<TodoItem> GetAll()
        {
            return repo.GetAllItems();
        }

        [HttpGet]
        [RouteAttribute("js/test.js")]
        public String testJs()
        {
            return "test.js";
        }
        
        [HttpPost()]
        [Route("api/todo/item")]
        public int Post([FromBody] TodoItem newTodo)
        {
            Console.WriteLine("Inside post method to add item");

            if (newTodo != null)
            {
            return repo.AddItem(newTodo);
            }
            return -1;
        }
        
        [HttpPut()]
        [Route("api/todo/{id}")]
        public int Put(int id, [FromBody] TodoItem itemToUpdate)
        {
            return repo.UpdateItem(id, itemToUpdate);
        }
        
        [HttpDelete()]
        [Route("api/todo/{id}")]
        public bool Delete(int id)
        {
            bool isDeleteSuccessful = false;
            try
            {
                repo.DeleteItem(id);
                isDeleteSuccessful = true;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
            }
        
            return isDeleteSuccessful;
        }
    }
}