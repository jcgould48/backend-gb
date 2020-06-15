## Welcome to Git Buzzed!
### Have a cold one

 In 2020 we all realized the importance the internet has in our lives especially when we are only able to meet digitally.  Git Buzzed was created to provide a space for friends to meet up with the assistance of a preferred video chat service and play some fun and interactive games.

 Currently Tic Tac Toe and Minesweeper are available to play.  We hope to add a larger selection of games in the future and allow players to compete over the internet.

 And to keep things interesting we added a drinking component for each game.


 ## Game Instructions- 

## Tic Tac Chug -
Play this game like normal tic tac toe. The loser has to take a drink.  For draws, both players have to take a drink.


## BeerSweeper- 
The game play is nearly identical to the classic mine sweeper game. Players alternate in revealing squares.  Who ever hits a mine, or a beer glass in this case has to drink. If one player completers the puzzle, the other player has to take two drinks.

*** 

## App Instructions-
If players want to download this app on their own computers, one person must download both front and back end repositories.
[Link to the Frontend](https://github.com/jcgould48/frontend-gb)
[Link to the Backend](https://github.com/jcgould48/backend-gb)


1. Fork and clone both repositories
2. npm install in directory
3. Create .env on the backend file and populate it with the following.

    * SECRET = 'Any string of text'
    * REFRESH_SECRET = 'Any string of text'
     * MONGODB_URI = 'Path to your MongoDB storage'

4. On the frontend create .env.development , .env.production files and populate them with the following.

* REACT_APP_API_HOST_ADDRESS=http://localhost:3001
* REACT_APP_RANDOM_NAME='string'
* REACT_APP_API_HOST_ADDRESS=TBD
* REACT_APP_RANDOM_NAME=TBD
     




### Special thanks to the following tutorials which helped us design the games

[Minesweeper Tutorial courtesy of Milkstarz](https://www.youtube.com/watch?v=tfz1TssUfzM)

[Tic Tac Toe Tutorial courtesy of 'Coding with Basir'](https://www.youtube.com/watch?v=it54tShOsuI)


***
Node Modules included in app:
        
    axios
    bcryptjs
    cookie-parser
    cors
    debug
    dotenv
    ejs
    express
    express-jwt
    http-errors
    jsonwebtoken
    moment
    mongoose
    morgan"
    validator
    bootstrap
    class-names
    js-cookie
    jwt-decode
    react
    react-bootstrap
    react-dom
    react-router-dom
    react-scripts
    react-toastify
  

