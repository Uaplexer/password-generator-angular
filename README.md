# Password Generator App

An improvised password generator using the Ninjas API.  
Built with Angular v19 using signals.

---

## Features

- Generates secure random passwords
- Specify password length
- Toggle inclusion of numbers and symbols
- Copy-to-clipboard support

---

### 1. Clone the repo

```bash
git clone https://github.com/Uaplexer/password-generator-angular.git
cd password-generator-angular
```

### 2. Install dependencies
```bash
npm i
```
### 3. Configure Ninjas Api Key
```bash
// src\environment\environment.sample.ts

export const environment = {
  production: false,
  ninjasApiUrl: 'https://api.api-ninjas.com',
  ninjasApiVersion: 'v1',
  ninjasApiKey: 'YOUR_API_KEY_HERE', <= Your api key here
};
```
### 4. Run the app
```bash
ng serve
```
Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.
