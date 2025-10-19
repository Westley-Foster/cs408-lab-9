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

//EvilCircle class (NOTE TO SELF: might be needed to be put below Ball)
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); //passes up the x and y values to Shape and hardcodes velX and velY in shape to 20
    //NOTE TO SELF: color and size might need to be changed to actually work, don't know yet)
    this.color = white;
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
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    //my added stuff
    super(x, y, velX, velY); //inherits the values x, y, velX, and velY from the Shape class
    //NOTE TO SELF: might need to put exists below the other parameters color and size
    this.exists = true; //creates a property "exists" that, if true, a ball has not been eaten yet

    // this.x = x;
    // this.y = y;
    // this.velX = velX;
    // this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

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

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();