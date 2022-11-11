!function() {
  const canvas = document.getElementById('game');
  let context = canvas.getContext('2d');
  let grid = 16;
  let count = 0;
  let score = 0;
  let sc = document.getElementById("scoree")
  let snake = {
    x: 16,
    y: 16,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
  };
  food = {
    x: grid,
    y: grid
  };
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + 16;
  }

  function resize() {
      const { innerWidth, innerHeight } = window;

      canvas.width = innerWidth;
      canvas.height = innerHeight;

      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
  }

  function render() {
    requestAnimationFrame(render);
    if (++count < 4) {
      return 0;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);
    context.fillStyle = 'lime';
    snake.cells.forEach( (cell, index) => {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      context.fillStyle = 'green';
      if (cell.x === food.x && cell.y === food.y) {
        snake.maxCells++;
        score++;
        sc.textContent = score;

        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
      }
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.maxCells = 4;
          snake.dx = grid;
          snake.dy = 0;
          food.x = getRandomInt(0, 25) * grid;
          food.y = getRandomInt(0, 25) * grid;
          sc.textContent = score - score;
          score = 0;
        }
      }
    });
  }

  window.addEventListener('keydown',  (event) => {
    if (event.code === "KeyA" && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }
    else if (event.code === "KeyW" && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    else if (event.code === "KeyD" && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    else if (event.code === "KeyS" && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });
  requestAnimationFrame(render);
  window.onload = resize;
  window.addEventListener("resize", resize);
}();