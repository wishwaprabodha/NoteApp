# Note Taking App (NodeJS + Docker + MySQL + JWT) 

Implementation of Backend API for Note Taking Application.

## Run with docker

1. Install docker if not installed.
2. Clone the Repository.
3. Run ``` docker build -t <tagname> . ``` to build.
4. Run ``` docker run --network="host" <tagname>```
5. Additional docker commands.
   6.  Remove all docker containers. ``` docker rm -vf $(docker ps -a -q) ```
   7.  Remove all docker images. ``` docker rmi -f $(docker images -a -q) ```

***

## Run without docker

1. Clone the Repository.
2. Upload the database schema to your localhost database.
3. Update the .env file accordingly.
4.  Run ``` npm install ```
5. Run the project on ``` npm start ```.

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
