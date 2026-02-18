# ⚡ VLSI Physical Design Hub & EDA Workstation

An immersive, interactive web platform built for ASIC Physical Design Engineers. This project combines a professional engineering portfolio, a comprehensive VLSI knowledge base, a tech blog, and a suite of gamified EDA (Electronic Design Automation) simulators.

**Developed by:** [Pritesh Hirani](https://linkedin.com/in/pritesh-hirani02) | ASIC Physical Design Engineer @ eInfochips

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

---

## 🚀 Features & Modules

This platform is divided into 5 core modules, accessible via the central **Command Center** (`index.html`).

### 1. 👨‍💻 Professional Portfolio (`portfolio.html`)
A sleek, terminal-themed interactive resume.
* **Terminal Profile:** A simulated Linux terminal displaying professional summary information.
* **Career Timeline:** Vertical timeline detailing experience at eInfochips (Advanced nodes: 5nm, 12nm).
* **Tech Stack Grid:** Skill categorization across Floorplanning, Timing Closure, Power Integrity, and EDA Scripting (TCL/Shell).
* **Project Executables:** Highlighted tapeout experience (Cadence Innovus, Synopsys Fusion Compiler/ICC2).

### 2. 📖 Learn PD (`learn.html`)
A high-density knowledge base for the RTL-to-GDSII flow.
* Horizontal, scroll-away tab navigation maximizing reading space.
* Detailed breakdowns of Floorplanning, Placement, CTS, Routing, and Signoff (DRC/LVS/STA).

### 3. 📝 Tech Blog (`blog.html`)
A repository of technical articles and tutorials.
* **3D Glassmorphism Cards:** Interactive blog cards that tilt dynamically based on mouse position.
* **Live Filtering & Search:** Instantly filter posts by tags (TIMING, AUTOMATION, VLSI) or search queries.
* **Immersive Reader:** A full-screen, distraction-free modal reader with optimized typography for long-form technical reading.

### 4. 🎮 EDA Simulators (`games.html`)
A suite of interactive mini-games designed to test physical design logic and signoff skills.
* **Macro Placement:** Drag and drop macros into a core area while avoiding DRC overlap violations.
* **Nano Router:** Route critical nets from Source to Target while dodging generated obstacles.
* **Timing ECO:** Add/remove buffers and upsize/downsize (VT/Drive) standard cells to fix Setup & Hold violations.
* **Congestion Detour:** Navigate global routing paths through GCells without exceeding local capacity limits.
* **Crosstalk Shielding:** Drag and drop track assignments to shield critical victim nets from aggressors.
* **Useful Skew:** Borrow time across flop clock pins to fix negative slack on critical data paths.

### 5. 💻 EDA Shell / Terminal (`terminal.html`)
A fully functional, interactive command-line emulator simulating real-world EDA tools.
* **Dual Modes:** Switch between `Innovus` and `Fusion Compiler` environments.
* **Tab Auto-Completion:** Features real Linux-style tab completion for Tcl commands.
* **Live Layout Viewer:** As you type commands (`read_netlist`, `floorPlan`, `place_opt`, `ccopt_design`, `route_auto`), the GUI visualizer dynamically generates site rows, places macros, draws power grids, and routes metal layers.
* **Violation Engine:** Forces users to run ECO commands to fix simulated timing and spacing DRC errors before allowing GDSII tapeout.

---

## 🎨 UI/UX & Technical Highlights

* **Cyberpunk Aesthetic:** Deep dark backgrounds, neon accents (Cyan, Pink, Yellow, Green), and glassmorphism (backdrop filters).
* **Custom Audio Engine:** Uses the native Web `AudioContext` API to generate procedural synthesized sound effects (beeps, success chords, error buzzes) without needing external audio files.
* **Bootloader Animations:** Every page features a fake terminal initialization sequence overlay.
* **Fully Responsive:** Complex components like the routing grids, terminal windows, and 3D cards mathematically adapt to mobile screens without breaking.
* **Zero Dependencies:** Built entirely with Vanilla HTML, CSS, and Vanilla JavaScript. (FontAwesome used for icons).

---

## 📂 Project Structure

```text
├── index.html        # Main Hub / Command Center
├── portfolio.html    # Interactive Resume & Timeline
├── learn.html        # Physical Design Knowledge Base
├── blog.html         # Tech Blog with 3D Cards & Immersive Reader
├── games.html        # Interactive PD Mini-games
├── terminal.html     # Innovus / Fusion Compiler CLI Emulator
├── style.css         # Global stylesheets & animations
└── script.js         # Global utilities (custom cursors, network background)
