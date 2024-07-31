using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;

        public UserController(UserService dataFromService)
        {
            _data = dataFromService;
        }


        //Add a User
        [HttpPost]

        public bool AddUser(CreateAccountDTO UserToAdd)
        {
            //create a variable with a type of service
             _data.AddUser(UserToAdd);
        }
    }
}