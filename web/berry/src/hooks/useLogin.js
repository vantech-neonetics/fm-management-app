Import necessary modules and functions. 
Define the `useLogin` custom hook to handle user login logic. 
Two additional functions are defined within `useLogin` for login with GitHub and Lark accounts, respectively.```
// Return a object with properties success and message
// If login is successful, dispatch login action and redirect to /panel
// If login fails, return a object with success as false and an empty message
// Wechat login function to handle login with Wechat OAuth
// Send request to backend API with Wechat authorization code
// If login is successful, dispatch login action, set user data in localStorage, show success message, and redirect to /panel
// If login fails, return a object with success status and message
// Logout function to handle user logout
// Send a request to backend API to logout the user
// Remove user data from localStorage, dispatch a logout action, and redirect to home page
// Return an object with login, logout, githubLogin, wechatLogin, and larkLogin functions
```