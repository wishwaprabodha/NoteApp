# Note Taking App (NodeJS + Docker + MySQL + JWT) 

Implementation of Backend API for Note Taking Application.

## MySQL Configurations

#### Since docker runs in a different network, docker application cannot access directly to your local or remote DB. 
1. Host the mySQL Database in a remote server or your localhost machine.
2. If using a remote server, change the bind-address in mysql.conf file from 127.0.0.1 to 0.0.0.0 ``` /etc/mysql/my.conf ``` (might be in a  different location according to your running OS).  
3. In the remote MySQL server, grant access from the remote host. (Use https://www.whatsmyip.org to get your current IP).
   
   ``` mysql> GRANT ALL ON <dbName>.* TO 'root'@'<remoteHostIP>' IDENTIFIED BY 'root' WITH GRANT OPTION; ```
4. Flush privileges

   ``` mysql> FLUSH PRIVILEGES; ```

***

## Run with Docker

1. Install docker if not installed.
2. Run ``` docker build -t <tagname> . ``` to build
3.  Run ``` docker run <tagname> --network="host"```

***


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
