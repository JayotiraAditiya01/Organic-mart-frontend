# 🌿 Organic E-Commerce Website

A modern, responsive React e-commerce website for organic products built with Vite, Tailwind CSS, React Router, and Framer Motion.

## ✨ Features

- **Modern Tech Stack**: React 19, Vite, Tailwind CSS
- **Smooth Animations**: Framer Motion for fluid page transitions and interactions
- **Routing**: React Router for seamless navigation
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Clean Architecture**: Organized folder structure with components, pages, routes, and styles
- **Reusable Components**: Navbar with mobile menu, Footer, and page layouts

## 📁 Project Structure

```
organic-ecommerce/
├── src/
│   ├── components/        # Reusable components (Navbar, Footer)
│   ├── pages/            # Page components (Home, Shop, About, Contact)
│   ├── routes/           # Routing configuration
│   ├── styles/           # Global styles and Tailwind utilities
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Tailwind directives and imports
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd organic-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🎨 Customization

### Colors

Update brand colors in `tailwind.config.js`:

```js
colors: {
  brand: {
    DEFAULT: "#16a34a",  // Primary green
    dark: "#166534",     // Darker green
  },
}
```

### Global Styles

Modify global styles in `src/styles/global.css`.

### Pages

Add new pages in `src/pages/` and register routes in `src/routes/AppRouter.jsx`.

## 📦 Tech Stack

- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Tailwind CSS
