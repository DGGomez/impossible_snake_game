
var drawModule = (function () {

  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var pizza = function(x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  var powerup = function(x, y){
    ctx.fillStyle = 'blue';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);

  }
  var doubsize = function(x,y){
    ctx.fillstyle ='blue';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }
  var obstical = function(x,y){
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'black';
    ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);

  }
  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h-5);
  }

  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }
  }

  var paint = function(){
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;
      var stateX = snakeX;
      var stateY = snakeY;
      var chance = Math.floor((Math.random() * 300) + 1);
      if (direction == 'right') {
        snakeX++;
        stateY++;
      }
      else if (direction == 'left') {
        snakeX--;
        stateY--;
        }
      else if (direction == 'up') {
        snakeY--;
        stateX++;
      } else if(direction == 'down') {
        snakeY++;
        stateX--;
          }

      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;
        }
        //if double snake power up is happening
        if(state==1){
          if (direction == 'right') {
                if(snakeX == obs.x && stateY == obs.y){
                  btn.removeAttribute('disabled', true);

                  ctx.clearRect(0,0,w,h);
                  gameloop = clearInterval(gameloop);
                  return;
                }
             }
          else if (direction == 'left') {
            if(snakeX == obs.x && stateY == obs.y){
              btn.removeAttribute('disabled', true);

              ctx.clearRect(0,0,w,h);
              gameloop = clearInterval(gameloop);
              return;
            }
             }
          else if (direction == 'up') {
            if(stateX == obs.x && snakeY == obs.y){
              btn.removeAttribute('disabled', true);

              ctx.clearRect(0,0,w,h);
              gameloop = clearInterval(gameloop);
              return;
            }
          } else if(direction == 'down') {
            if(stateX == obs.x && snakeY == obs.y){
              btn.removeAttribute('disabled', true);

              ctx.clearRect(0,0,w,h);
              gameloop = clearInterval(gameloop);
              return;
            }
           }
        }
        if(snakeX == obs.x && snakeY == obs.y){
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;
        }


        if(chance>290){
          createPowerup();
          powerup(pow.x,pow.y);
        }


        if(snakeX == doub.x && snakeY==doub.y){
          state=1;
        }

        if(state==1){
          if (direction == 'right') {
                if(snakeX == food.x && stateY == food.y){
                  var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
                  score ++;

                  if(chance>200){
                    createDoubsize();
                    state=0;
                  }
                  createFood(); //Create new food
                  createObstical();

                }
             }
          else if (direction == 'left') {
            if(snakeX == food.x && stateY == food.y){
              var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
              score ++;

              if(chance>200){
                createDoubsize();
                state=0;
              }
              createFood(); //Create new food
              createObstical();

            }
             }
          else if (direction == 'up') {
            if(stateX == food.x && snakeY == food.y){
              var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
              score ++;

              if(chance>290){
                createDoubsize();
                state=0;
              }
              createFood(); //Create new food
              createObstical();

            }
          } else if(direction == 'down') {
            if(stateX == food.x && snakeY == food.y){
              var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
              score ++;

              if(chance>200){
                createDoubsize();
                state=0;
              }
              createFood(); //Create new food
              createObstical();

            }
           }
        }

        if((snakeX == food.x && snakeY == food.y) ){
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          score ++;

          if(chance>200){
            createDoubsize();
            state=0;
          }
          createFood(); //Create new food
          createObstical();

        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX;
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
          if(state==1){
            if (direction == 'right') {
              bodySnake(snake[i].x,snake[i].y+1);
               }
            else if (direction == 'left') {
              bodySnake(snake[i].x,snake[i].y-1);
               }
            else if (direction == 'up') {
              bodySnake(snake[i].x+1,snake[i].y);
            } else if(direction == 'down') {
              bodySnake(snake[i].x-1,snake[i].y);
             }
          }
        }

        pizza(food.x, food.y);
        obstical(obs.x,obs.y);

        if(state==0){
        doubsize(doub.x,doub.y);}

        scoreText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }
  var createDoubsize = function() {
      doub = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (doub.x===snakeX && doub.y === snakeY || doub.y === snakeY && doub.x===snakeX) {
          doub.x = Math.floor((Math.random() * 30) + 1);
          doub.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }
  var createPowerup = function() {
      pow = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (pow.x===snakeX && pow.y === snakeY || pow.y === snakeY && pow.x===snakeX) {
          pow.x = Math.floor((Math.random() * 30) + 1);
          pow.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }
  var createObstical = function() {
      obs = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (obs.x===snakeX && obs.y === snakeY || obs.y === snakeY && obs.x===snakeX) {
          obs.x = Math.floor((Math.random() * 30) + 1);
          obs.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }
  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      }
      return false;
  }

  var init = function(){
      direction = 'down';
      score=0;
      state=0;
      drawSnake();
      createFood();
      createObstical();
      createPowerup();
      createDoubsize();
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };


}());
