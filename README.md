# Expo Starter Template

**A modern starter template for building robust mobile applications with Expo and [Laravel API](https://github.com/mattsimplepixels/expo-starter-api).**

---

## 🚀 Features

-   Pre-configured Expo environment
-   Authentication ready (integrated with Laravel API)
-   Fully typed with TypeScript
-   NativeWind for styling
-   React Native Reusables components
-   Customizable and scalable project structure

---

## 🛠 Installation

### Laravel API Installation

1. Clone the laravel API repository:

    ```bash
    git clone https://github.com/mattsimplepixels/expo-starter-api

    cd expo-starter-api
    ```

2. Install the PHP dependencies using Composer:

    ```bash
    composer install
    ```

3. Create a new .env file by copying the example:

    ```bash
    cp .env.example .env
    ```

4. Generate the application key:

    ```bash
    php artisan key:generate
    ```

5. Set up the SQLite database:

    ```bash
    touch database/database.sqlite
    ```

6. Migrate and seed the database

    ```bash
    php artisan migrate:refresh --seed
    ```

7. Serve the Laravel API over your machine's local IP:

    Replace 192.168.1.100 with your machine's local IP address:

    ```bash
    php artisan serve --host 192.168.1.100 --port=8000
    ```

---

### Expo App Installation

1. Clone the Expo app repository:

    ```bash
    git clone https://github.com/mattsimplepixels/expo-starter
    cd expo-starter
    ```

2. Install the dependencies

    ```bash
    npm install
    ```

3. Update the .env file to point to your Laravel API server:

    ```bash
    EXPO_PUBLIC_API_URL=http://192.168.1.101:8000
    ```

4. Start the development server

    ```bash
    npm run web
    ```

5. Run the app on your device or emulator:

    On a physical device: Install the Expo Go app, scan the QR code displayed in your terminal or browser, and open the app.

6. The app will connect to your Laravel API server and is ready to use. 🎉

    Default credentials from initial seed are:

    test@example.com
    password
