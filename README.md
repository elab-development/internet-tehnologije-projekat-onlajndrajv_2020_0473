# File Management Web Application

### Tech Stack
* React.js (JavaScript, HTML)
* CSS
* Laravel (PHP)
* MySQL
* REST API

Users of this app (e.g. employees or company owners) register or login if they already have an account via form on start page. 

![Register page](/register_page.png)

If they are employed, files shared within company are going to be shown at main page. Files and folders are saved in hierarchical order just like on most OS and file management softwares.

Main page demo:

![Main page](/demo.gif)

### Security
* User passwords are encrypted with SHA-256
* Session tokens are required for some sensitive API requests
* Tokens lasts for 60 minutes and after that requires login
