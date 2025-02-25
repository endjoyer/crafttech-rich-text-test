# Canvas Text Editor

A powerful React-based canvas editor that allows users to create, manipulate and style text and shapes on a canvas element. Built with React, TypeScript, and Konva.

## 🚀 Features

- **Interactive Canvas**: Pan, zoom and manipulate the canvas workspace
- **Shape Management**:
  - Add and move shapes freely
  - Resize and transform shapes
  - Snap-to-grid functionality
  - Customizable shape properties (color, border, etc.)
- **Rich Text Editor**:
  - Full text formatting capabilities
  - Support for multiple fonts
  - Color picker for text
  - Text styling (bold, italic, underline)
  - Text alignment options
  - Font size control
- **Real-time Preview**: See your text changes instantly
- **Export Capabilities**: Convert text to images while preserving styles
- **Responsive Design**: Works across different screen sizes

## 🛠 Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- Konva.js
- TipTap
- SCSS
- Vite

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/endjoyer/crafttech-rich-text-test.git
```

2. Install dependencies:

```bash
cd canvas-text-editor npm install
```

3. Start the development server:

```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Creates production build
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews production build
- `npm run format` - Formats code using Prettier

## 🏗 Project Structure

```md
src/  
├── components/ — React components  
├── store/ — Redux store and slices  
├── hooks/ — Custom React hooks  
├── types/ — TypeScript type definitions  
├── utils/ — Utility functions  
├── styles/ — SCSS styles  
└── assets/ — Static assets
```

## 🎨 Usage

1. Use the cursor tool (🖱️) to interact with shapes and canvas
2. Use the add tool (➕) to create new shapes
3. Click on any shape to open the text editor
4. Use the toolbar to style your text
5. Click outside to save changes
