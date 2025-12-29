
# Insta-Fiche Product Card Generator

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A simple and elegant web application to create beautiful, modern product cards ("fiches") for Instagram. Inspired by the clean aesthetic of brands like *The Ordinary*, this tool allows you to easily generate high-quality, shareable images for your products.

### [➡️ Live Demo Link (Placeholder)](https://your-live-demo-url.com)

---



## ✨ Key Features

- **Modern & Stylish Design**: A vibrant gradient background and a clean layout to make your products pop on any social media feed.
- **Easy-to-Use Editor**: Instantly see your changes with a live preview as you edit the product name, description, price, and more.
- **Multilingual Support**: Includes fields for both English and Arabic descriptions, with proper RTL text rendering.
- **Custom Fonts**: Utilizes the "Inter" font for English and the elegant "Cairo" font for Arabic text.
- **Promotion & Status Tags**: Add custom promotional text (e.g., "NEW", "BEST SELLER") or an eye-catching "SOLD OUT" overlay.
- **Multi-Image Carousel**: Showcase your product from different angles by adding multiple images.
- **Instagram-Optimized Export**: Download your final design as a high-resolution (1100x1100px) JPG, perfect for a crisp look on Instagram.
- **Persistent State**: Your product list is automatically saved to your browser's local storage, so your work is never lost.
- **Zero Build-Step Needed**: Runs directly in the browser with no complex setup required.

## 🛠️ Tech Stack

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For rapid, utility-first styling.
- **html-to-image**: A powerful library to convert the HTML product card into a downloadable JPG image.

## 🚀 Installation & Setup

This project uses a modern setup that requires **no build step** or package manager like `npm` or `yarn`. All dependencies are loaded directly in the browser via an `importmap`.

To run the application locally, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/insta-fiche-generator.git
    cd insta-fiche-generator
    ```

2.  **Run a local server:**
    Since the app uses ES Modules, you need to serve the files from a local server to avoid CORS issues. The easiest way is to use a VS Code extension.

    - **Using VS Code & Live Server Extension:**
        1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
        2.  Open the project folder in VS Code.
        3.  Right-click on the `index.html` file and select "Open with Live Server".
    
    - **Without VS Code:**
        You can use any simple local server. For example, if you have Python installed:
        ```bash
        # For Python 3
        python -m http.server
        ```
        Then, open your browser and navigate to `http://localhost:8000`.

That's it! The application should now be running in your browser.

## 📖 How to Use

1.  **Select a Product**: Use the dropdown menu in the editor to switch between products or create a new one.
2.  **Edit Details**: Click on any field in the editor panel (Product Name, Description, Price, etc.) to update its content. The changes will appear in real-time on the product card preview.
3.  **Manage Images**:
    - Click the **"+"** button to upload new images from your computer.
    - Hover over an existing image and click the "X" icon to delete it.
4.  **Download Your Fiche**: Once you are happy with your design, click the **"Download as JPG"** button to save the high-resolution image to your computer.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
