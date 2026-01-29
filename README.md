# 2o48 Game - Enhanced Edition

**End Term Project**  
**Name:** Harsh Yadav  
**Roll Number:** 10756

**link:** https://harshyadav777.github.io/End-term-Project-10756-/

---

## 📖 Project Overview

This is an advanced implementation of the classic 2048 puzzle game built with vanilla HTML, CSS, and JavaScript. The game features a modern, responsive design with rich animations, particle effects, and an enhanced gameplay experience including combo systems, undo functionality, and intelligent hints.

## ✨ Features

### Core Gameplay
- **Classic 2048 Mechanics**: Slide and merge tiles to reach the 2048 tile
- **Smooth Animations**: Tile spawning, merging, and movement animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Controls**: Arrow keys (↑ ↓ ← →) or WASD keys for movement

### Advanced Features
- **🎯 Combo System**: Build combos by consecutive merges for bonus points
- **↩️ Undo Function**: Take back your last move
- **💡 Smart Hints**: Get suggestions for your next move
- **📊 Statistics Tracking**: 
  - Current score
  - Best score (saved in local storage)
  - Move counter
  - Combo multiplier
  - Total merges
  - Largest tile achieved
  - Play time

### Visual Enhancements
- **Particle Effects**: Visual feedback for tile spawning and merging
- **Score Popups**: Animated score indicators with combo multipliers
- **Fireworks**: Celebration effects when you win
- **Color Coded Tiles**: Each tile value has a distinct, beautiful color
- **Smooth Gradients**: Modern gradient backgrounds
- **Responsive UI**: Adapts to different screen sizes

### User Experience
- **Local Storage**: Best score persists across sessions
- **Game Over Detection**: Intelligent detection when no moves are available
- **Win Screen**: Celebratory screen with detailed statistics
- **Loss Screen**: Encouraging game-over screen with performance stats
- **New Record Animation**: Special animation when beating your high score

## 🎮 How to Play

1. **Objective**: Combine tiles with the same number to create larger numbers. Reach the **2048 tile** to win!

2. **Controls**:
   - **Arrow Keys** or **WASD**: Move tiles in the respective direction
   - **Restart Button**: Start a new game
   - **Hint Button**: Get a suggested move
   - **Undo Button**: Undo your last move

3. **Scoring**:
   - Each merge adds points based on the new tile value
   - Build combos for bonus points (10% more per consecutive merge)
   - Try to achieve the highest score possible!

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations or dependencies required

### Installation

1. **Clone or download** this repository
2. **Navigate** to the project directory
3. **Open** `index.html` in your web browser

```bash
# Method 1: Direct opening
open index.html

# Method 2: Using a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📁 Project Structure

```
End_term_Project/
├── index.html      # Main HTML file
├── style.css       # Styling and animations
├── script.js       # Game logic and functionality
└── README.md       # Project documentation
```

## 🎨 CSS Features

- **CSS Variables**: Easy color customization through CSS custom properties
- **Responsive Design**: Breakpoints for various screen sizes
- **Animations**: Keyframe animations for tiles, particles, and UI elements
- **Modern Layout**: Flexbox and Grid for responsive layouts
- **Accessibility**: Reduced motion support for users who prefer it

## 💻 Technical Implementation

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with variables, animations, and gradients
- **JavaScript (ES6+)**: Game logic, DOM manipulation, and event handling

### Key JavaScript Features
- Event-driven architecture
- Local storage for data persistence
- Dynamic DOM manipulation
- Animation timing and state management
- Modular function organization

### Game Logic Highlights
- 4x4 grid system
- Slide and merge algorithms
- Move validation
- Win/loss condition detection
- State management for undo functionality

## 🎯 Game Statistics

The game tracks the following metrics:
- **Score**: Current game score with combo multipliers
- **Best Score**: Your all-time high score (saved locally)
- **Moves**: Total number of moves made
- **Combo**: Current consecutive merge streak
- **Total Merges**: Number of tile merges in current game
- **Largest Tile**: Highest tile value achieved
- **Play Time**: Duration of current game session

## 🌟 Future Enhancements

- Add difficulty levels (different grid sizes)
- Implement power-ups and special tiles
- Add sound effects and background music
- Create a leaderboard system
- Add touch gesture controls for mobile
- Implement AI opponent mode

## 📝 Code Highlights

### CSS Variables for Easy Customization
All colors are defined as CSS custom properties, making it easy to change the theme:

```css
:root {
  --bg-primary: #faf8ef;
  --tile-2: #eee4da;
  --tile-2048: #edc22e;
  /* ... and more */
}
```

### Combo System
The game features a combo multiplier that rewards consecutive merges:

```javascript
const comboMultiplier = 1 + (combo * 0.1);
const scoreGain = Math.floor(mergedValue * comboMultiplier);
```

### Particle Effects
Visual feedback through dynamically generated particle animations.

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

This project is created as an academic end-term project.

## 👤 Author

**Harsh Yadav**  
Roll Number: 10756

---

## 🙏 Acknowledgments

- Original 2048 game concept by Gabriele Cirulli
- Enhanced with modern web development practices and additional features

---

**Enjoy the game! Try to reach 2048 and beyond! 🎮🏆**
