# CS408 - Lab9.2

Westley Foster
October 10, 2022

## Overview

Lab 09 has us creating a web browser game using a combination of HTML, CSS, and JavaScript (mostly JavaScript).
We use a variety of techniques and methods to create functions and classes that create and draw multi-colored
bouncy balls that move around the screen and bounce back after touching any edges of the screen. We then create
another class that creates a user-controlled ball that "eats" the other bouncy balls when a collision occurs
between them.

## How to Run

To run the project in VSCode, simply install the Live Preview and Live Server extensions and then go to the
command bar at the top of the IDE. Click on the bar and type in "Live Preview: Start Server". A side window
should appear with your program running in a simulated browser. To better view the project while running 
the server, copy and paste the url in the side window into your own web browser.

## Sources and Credits

- Building constructors and creating an object with those constructors: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics#introducing_constructors
- strokeStyle(), stroke(), and lineWidth(): https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Drawing_graphics
- checkBounds() in EvilCircle class: ChatGPT
- collisionDetect() in EvilCircle class: ChatGPT
- Correctly spawning in the EvilCircle: ChatGPT
- Referencing the paragraph: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON
- Keeping track of ball count: ChatGPT and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?utm_source=chatgpt.com
