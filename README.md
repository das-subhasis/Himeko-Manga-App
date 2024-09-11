# Himeko-Manga-App

A diverse manga platform where you can read mangas from all genres and keep track of your reading progress!

## Screenshots

![Screenshot (2)](https://github.com/user-attachments/assets/22f4bc30-8728-4aff-9048-9fe3b660b64e)


![Screenshot (4)](https://github.com/user-attachments/assets/dc59b9c7-e385-4259-8169-be5920b73d8e)

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/das-subhasis/Himeko-Manga-App.git
   cd Himeko-Manga-App
   ```

2. **Install frontend dependencies:**
   ```bash
   cd FrontEnd
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../BackEnd
   npm install
   ```

4. **Setup environment variables:**
   - Create a `.env` file in the `server` directory with the following content:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the application:**
   - Start the backend server:
     ```bash
     cd BackEnd
     node server.js
     ```
   - Start the frontend development server:
     ```bash
     cd ../FrontEnd
     npm run dev
     ```

