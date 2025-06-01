# FormCraft - Form Builder

A modern form builder application built with React.js that allows users to create, customize, and share forms with an intuitive drag-and-drop interface.

## Live Demo
[View Live Application](https://form-builder-three-rho.vercel.app)

## Features

- **Drag & Drop Interface** - Add form fields by dragging from the palette
- **Field Types** - Text, Email, Phone, Textarea, Dropdown, Checkbox, Date, Number
- **Real-time Preview** - See changes instantly as you build
- **Multi-step Forms** - Create complex forms with step navigation
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Form Sharing** - Generate shareable links for your forms
- **Auto-save** - Forms are automatically saved to localStorage
- **Dark/Light Theme** - Toggle between themes
- **Field Validation** - Required fields, min/max length, email/phone validation

## Tech Stack

- React.js 18
- Tailwind CSS
- Context API for state management
- @hello-pangea/dnd for drag and drop
- React Router for navigation
- localStorage for data persistence

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/formcraft.git
cd formcraft
```

2. Install dependencies


```bash
npm install
```

3. Start the development server


```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser


## How to Use

1. **Create a Form** - Click "Start Building" on the homepage
2. **Add Fields** - Drag field types from the left panel to the form area
3. **Configure Fields** - Click on any field to edit its properties
4. **Preview** - Use the preview button to test your form
5. **Publish & Share** - Click publish to generate a shareable link


## Assignment Requirements

This project fulfills all the requirements for the SDE Frontend Internship assignment:

-  Drag-and-drop interface with supported field types
-  Field reordering and configuration
-  Multi-device preview modes
-  Template support and local storage
-  Multi-step forms with progress tracking
-  Shareable form URLs and public form filling
-  Bonus features: Auto-save, response viewing


## Build for Production

```bash
npm run build
```

## About

Built as part of an SDE internship assignment to demonstrate frontend development skills, React architecture, and modern web development practices.