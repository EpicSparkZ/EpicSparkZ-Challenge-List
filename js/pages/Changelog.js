<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Roulette Challenge</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #111;
      color: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    h1 {
      margin-bottom: 1rem;
    }

    .wheel-container {
      position: relative;
      width: 300px;
      height: 300px;
      margin-bottom: 2rem;
    }

    .wheel {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 10px solid #333;
      position: relative;
      overflow: hidden;
      transition: transform 4s cubic-bezier(0.33, 1, 0.68, 1);
    }

    .wheel div {
      position: absolute;
      width: 50%;
      height: 50%;
      background-color: #1a1a1a;
      transform-origin: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #eee;
      font-size: 14px;
      box-sizing: border-box;
      border: 1px solid #333;
    }

    .pointer {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 20px solid #f00;
    }

    .controls {
      margin-bottom: 2rem;
    }

    .level-details {
      text-align: center;
    }

    .level-details a {
      color: #0af;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h1>Roulette Challenge</h1>
  <div class="wheel-container">
    <div class="pointer"></div>
    <div class="wheel" id="wheel">
      <!-- Slices will be populated here -->
    </div>
  </div>
  <div class="controls">
    <button id="spinButton">Spin</button>
  </div>
  <div class="level-details" id="levelDetails">
    <p>Click "Spin" to select a random level.</p>
  </div>

  <script>
    const levels = [
      { name: "Level One", id: 101, video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { name: "Level Two", id: 102, video: "https://www.youtube.com/watch?v=oHg5SJYRHA0" },
      { name: "Level Three", id: 103, video: "https://www.youtube.com/watch?v=3GwjfUFyY6M" },
      { name: "Level Four", id: 104, video: "https://www.youtube.com/watch?v=2Z4m4lnjxkY" },
      { name: "Level Five", id: 105, video: "https://www.youtube.com/watch?v=DLzxrzFCyOs" },
      { name: "Level Six", id: 106, video: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
      { name: "Level Seven", id: 107, video: "https://www.youtube.com/watch?v=ZZ5LpwO-An4" },
      { name: "Level Eight", id: 108, video: "https://www.youtube.com/watch?v=6_b7RDuLwcI" }
    ];

    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const levelDetails = document.getElementById('levelDetails');

    const sliceCount = levels.length;
    const sliceDeg = 360 / sliceCount;
    let currentRotation = 0;

    // Create wheel slices
    levels.forEach((level, index) => {
      const slice = document.createElement('div');
      slice.style.transform = `rotate(${index * sliceDeg}deg) skewY(${90 - sliceDeg}deg)`;
      slice.style.backgroundColor = `hsl(${index * sliceDeg}, 70%, 40%)`;
      slice.innerHTML = `<span style="transform: skewY(${sliceDeg - 90}deg) rotate(${sliceDeg / 2}deg); display: block; width: 100%; text-align: right; padding-right: 10px;">${level.name}</span>`;
      wheel.appendChild(slice);
    });

    function spinWheel() {
      const randomIndex = Math.floor(Math.random() * sliceCount);
      const degrees = 360 * 5 + (360 - randomIndex * sliceDeg - sliceDeg / 2);
      currentRotation += degrees;
      wheel.style.transform = `rotate(${currentRotation}deg)`;

      setTimeout(() => {
        const selectedLevel = levels[randomIndex];
        levelDetails.innerHTML = `
          <h2>${selectedLevel.name}</h2>
          <p><strong>ID:</strong> ${selectedLevel.id}</p>
          <p><a href="${selectedLevel.video}" target="_blank">Watch Showcase</a></p>
        `;
      }, 4000); // Match the transition duration
    }

    spinButton.addEventListener('click', spinWheel);
  </script>
</body>
</html>
