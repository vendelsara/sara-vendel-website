
// Start Pixi and put its canvas on the page
const app = new PIXI.Application();

await app.init({
  resizeTo: window,
  background: "#ffffff",
  antialias: true
});

document.body.appendChild(app.canvas);

// Create a graphics object for all the hearts
const hearts = new PIXI.Graphics();
app.stage.addChild(hearts);

// Remember where the mouse is
const mouse = { x: -1000, y: -1000 };

window.addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Draw the hearts every frame
app.ticker.add(() => {
  // Clear the previous frame
  hearts.clear();

  // Create a grid of hearts
  for (let x = 0; x < app.screen.width; x += 30) {
    for (let y = 0; y < app.screen.height; y += 30) {

      // Calculate the distance between the mouse and each heart
      const distance = Math.hypot(
        x - mouse.x,
        y - mouse.y
      );

      // Calculate the size based on mouse distance
      // Hearts return to their original size when the mouse moves away
      const size = 2 + 6 * Math.max(0, 1 - distance / 180);

      // Draw each heart
      hearts.moveTo(x, y + size * 0.35);

      hearts.bezierCurveTo(
        x - size, y - size * 0.3,
        x - size * 0.7, y - size,
        x, y - size * 0.45
      );

      hearts.bezierCurveTo(
        x + size * 0.7, y - size,
        x + size, y - size * 0.3,
        x, y + size * 0.35
      );

    }
  }

  // Fill all hearts with pink
  hearts.fill("#ff69b4");
});
