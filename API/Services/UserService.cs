using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class UserService : ControllerBase
    {
       private readonly DataContext _context;
       //create a constuctor

       public UserService(DataContext context)
       {
        _context = context;
       }
    
    //helper function to help us check if the use exist because we kept repeating code in our product API.
    //lets name is it DoesUserExist(string username)

    public bool DoesUserExist(string username)
    {
        //check our tables to see if the username exist
        //if one item matches our condition that item will be returned
        //if multple items match it will return an error
        return _context.UsersInfo.SingleOrDefault(user => user.Username == username) != null;
    }

    public bool AddUser(CreateAccountDTO UserToAdd)
    {
        //create a variable name it result and initilize it to false
        bool result = false;
        //if the user already exist
        if(!DoesUserExist(UserToAdd.Username))
        {
            //create new instance of our UserModel
            //how do we create an instance of our userModel?
            UserModel newUser = new UserModel();

            var newHashedPassword = HashPassword(UserToAdd.Password);

            newUser.Id = UserToAdd.Id;
            newUser.Username = UserToAdd.Username;
            newUser.Salt = newHashedPassword.Salt;
            newUser.Hash = newHashedPassword.Hash;

            _context.Add(newUser);

            result =  _context.SaveChanges() != 0;
        }
        return result;
        //if it does not exist we add an account
        //else throw a false
        
    }

     public PasswordDTO HashPassword(string password)
     {
        //create a password DTO this is what will return
        //New instance of our PasswordDTO
        PasswordDTO newHashedPassword = new PasswordDTO();
        //create a new instance of byte 64 array and save it to saltbyts
        byte[] SaltBytes = new byte[64];

        //RNGCryptoServiceProvider creates random numbers
        var provider = new RNGCryptoServiceProvider();

        //now we are going to get rid of all the zeros
        provider.GetNonZeroBytes(SaltBytes);

        //create a variable for our salt. this will encrypt our 64 string and encrptyit for us
        var Salt = Convert.ToBase64String(SaltBytes);

        //now lets create our Hash, firs arg is password, byts, iterations
        var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes,10000);

        var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));

        //return newHashedPassword.Salt = Salt;
        
        newHashedPassword.Salt = Salt;
        newHashedPassword.Hash = Hash;

        return newHashedPassword;
     }

//function to verify user password

public bool verifyUserPassword(string? Password, string? StoredHash, string? StoredSalt)
{
    var SaltBytes = Convert.FromBase64String(StoredSalt);
    var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password, SaltBytes,10000);
    var newHash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));
    return newHash == StoredHash;
}

        public IEnumerable<UserModel> GetAllUsers()
        {
           return _context.UsersInfo;
        }

        public UserModel GetAllUserDataByUsername(string username){
            return _context.UsersInfo.FirstOrDefault(user => user.Username == username);
        }

        public IActionResult Login(LoginDTO user)
        {
            IActionResult Result = Unauthorized();
            if(DoesUserExist(user.UserName))
            {
                UserModel foundUser = GetAllUserDataByUsername(user.UserName);
                if(verifyUserPassword(user.Password, foundUser.Hash, foundUser.Salt)){
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("letsaddmorereallylongkeysuperSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            Result = Ok(new  { Token = tokenString });

                }



            }
            return Result;
        }

        internal UserIdDTO GetUserIdDTOByUserName(string username)
        {
            throw new NotImplementedException();
        }

        public UserModel GetUserByUserName(string? username)
        {
            return _context.UsersInfo.SingleOrDefault(user => user.Username == username);
        }
        public bool DeleteUser(string userToDelete)
        {
            UserModel foundUser = GetUserByUserName(userToDelete);
            bool result = false;
            if(foundUser != null)
            {
                foundUser.Username = userToDelete;
                _context.Remove<UserModel>(foundUser);
                result = _context.SaveChanges() != 0;

            }
            return result;
        }

        public UserModel GetUserById(int id)
        {
            return _context.UsersInfo.SingleOrDefault(user => user.Id == id);
        }

        public bool UpdateUser(int id, string username)
        {
            UserModel foundUser = GetUserById(id);
            bool result = false;
            if(foundUser != null)
            {
                foundUser.Username = username;
                _context.Update<UserModel>(foundUser);
                result = _context.SaveChanges() != 0;
            }
            return result;
        }
    }
}