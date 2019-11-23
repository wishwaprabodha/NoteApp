# Note Taking App (NodeJS) 

Implementation of Backend API for Note Taking Application.

## Installation

1. Clone the Repository.
2. Upload the database schema to your localhost database.
3. Update the .env file accordingly.
3.  Run ``` npm install ```
4. Run the project on ``` npm start ```.

***

* Before running the project, add a user to the database after removing authentication middleware from the user adding route.
* Run a POST request on ``` localhost:4000/api/user ```
``` 

{
	"userName" : "<your username>",
	"useEmail" : "<your email>",
	"userPasswordHash" : "<your password>"
}
```
* Add the route again and rerun the application.
* Run a POST request on ``` localhost:4000/api/user/login ```
``` 
{
	"userEmail" : "<your email>",
	"userPasswordHash" : "<your password>"
}
```
* Enjoy!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Unit testing will be implemented soon.

## Thank You!
