<!-- Goal is to create FullStack web app for a blog site -->
<!-- Backend will be done .Net 8, web api, EF core, SQL Server -->
<!-- Front End will be done in React with Javascript-->
<!-- Deploy with Azure Statatic web apps -->


<!-- create an API for Blog, this must handle all CRUD Functions -->

<!-- 
CRUD
Create
Read
Update
Delete
 -->

 <!-- In this app, the user should be able to login, so we need login page -->

 <!-- Create An account page -->

 <!-- Blog view post page of published items-->
 <!-- Dashboard page(profile page, will edit, delete,publish, unpublish your blog post) -->

 <!-- SQL Server from azure for our Database -->

 <!-- Folder structure -->

 <!-- Controllers//Folder 
    UserController: Handle all our user interactions
    All our endpoints will be im this controller for users

 -->

 <!-- Login//Endpoint
    AddUser//endpoint
    UpdateUser//endpoint
    DeleteUser//endpoint
  -->

<!-- BlogController
    AddBlogItems//endpoint C
    GetAllBlogItems//endpoint R
    GetBlodItemsByCategory//endpoint 
    GetAllBlogItemsByTags//
    GetAllBlogItemsByDate//
    UpdateBlogItems//endpoint U
    DeleteBlogItems//endpoint D
 -->


 <!-- Models -->

 <!-- Model Folder -->

 <!-- UserModel

        id int
        username string
        Salt string
        Hash string
    
  -->

  <!-- BlogItemModel

        id int
        userid int
        PublisherName string
        Title string
        Image string
        Description string
        Date string
        Category string
        IsPublished bool
        IsDeleted bool
    
   -->

   <!----------------- Items that will be saved to our database are above-------------------------------- -->

   <!-- LoginModel
            Username string
            password string
        CreateAccountModel
            Id int
            username string
            password string
        passwordModel
        Salt string
        Hash string
    -->


<!-- Services//Folder
        UserService//file
            GetUserByUsername
            Login
            AddUser
            DeleteUser
        BlogItemService
            AddBlogItems
            GetAllBlogItemsByCategory//functions(methods)
            GetAllBlogItemsByTag
            GetAllBlogItemsByDate
            UpdateBlogItems
            DeleteBlogItems
            GetUsersById
  -->

  <!-- Password Service//file
  
        hash password

        very hash password
   -->