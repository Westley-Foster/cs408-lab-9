// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//Shape class (had to be added above Ball class to work)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

//EvilCircle class
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); //passes up the x and y values to Shape and hardcodes velX and velY in shape to 20
    this.color = "white";
    this.size = 10;

    //adds an Event Listener to allow player movement
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX; //moves character left
          break;
        
        case "d":
          this.x += this.velX; //moves character right
          break;
        
        case "w":
          this.y -= this.velY; //moves character up
          break;

        case "s":
          this.y += this.velY; //moves character down
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color; //changed fillStyle to strokeStyle
    ctx.lineWidth = 3; //thickens the line to see the circle easier
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke(); //changed fill to stroke
  }

  //changes the x/y values to bounce the EvilCircle back into the screen if it hits the screen's bounds
  //updated with the help of ChatGPT
  checkBounds() {
    if(this.x + this.size >= width) {
      this.x = width - this.size; // push back from right edge
    }

    if(this.x - this.size <= 0) {
      this.x = this.size; // push away from left edge
    }

    if(this.y + this.size >= height) {
      this.y = height - this.size; // push up from bottom edge
    }

    if(this.y - this.size <= 0) {
      this.y = this.size; // push down from top edge
    }
  }

  //written with help from ChatGPT
  collisionDetect() {
    //detects a collision only if a ball exists
    for(const ball of balls) {
      //if a ball doesn't exist, it's been eaten, so do nothing
      if(!ball.exists) {
        continue
      }

      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.size + ball.size) {
        //added ball increase size for fun
        this.size += ball.size; //makes the EvilCircle grow bigger in proportion to the size of the ball it eats
        ball.exists = false;
      }
    }
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    //my added stuff
    super(x, y, velX, velY); //inherits the values x, y, velX, and velY from the Shape class
    this.exists = true; //creates a property "exists" that, if true, a ball has not been eaten yet

    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  //updates the velocities of balls so that they bounce in the opposite direction of the screen's bounds
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    //detects a collision only if a ball exists
    if(this.exists){
      for (const ball of balls) {
        if (!(this === ball)) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

//creates an EvilCircle character in the middle of the screen (fixed with ChatGPT)
//my old code: const evilCircle = new EvilCircle(this.x, this.y);
const evilCircle = new EvilCircle(width / 2, height / 2);

//create a variable that stores a reference to the paragraph.
const paragraph = document.getElementById("ball-count");

//keeps a count of the number of balls on screen and increments and decrements the ball count
function updateBallCount() {
  const ballCount = balls.filter(ball => ball.exists).length; //referenced by ChatGPT and developer.mozilla.org
  paragraph.textContent = `Ball Count: ${ballCount}`;
  canvas.setAttribute("aria-label", paragraph);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if(ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  updateBallCount();

  requestAnimationFrame(loop);
}

loop();