# 🚨 Nexus Smart Helmet Monitoring System

A full-stack **Real-Time Helmet Monitoring System** designed for **smart coal mining** safety using **IoT (ESP32 + Blynk)**, **React.js**, **MongoDB**, and **Tailwind CSS**. It monitors **gas levels, temperature, heart rate (RPM), fall detection**, and calculates **helmet-to-helmet distance**, with support for **live dashboard, data export**, and alerts.

---

## 📌 Features

- 🔴 Real-time monitoring of multiple helmets
- 🌡️ Sensor data: Temperature (from MPU6050), Gas levels (MQ series), Fall Detection (MPU6050), Heart Rate in RPM (HW-827)
- 📍 Distance calculation between helmets using coordinates (x, y, z)
- 🧭 Interactive dashboard with zoom, drag, and distance visualization
- 📊 Live gas level, heart rate, and distance tables
- 📥 Export data to Excel (`.xlsx`)
- 🧠 Data stored in MongoDB for history
- 🛰️ Blynk IoT integration for wireless data

---

## ⚙️ Technologies Used

### 🧠 Frontend
- **React.js**
- **Tailwind CSS**
- **Lucide Icons**
- **Vanta.js** (animated background)
- **XLSX.js** (Excel export)

### 📡 Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**

### 📟 IoT
- **ESP32**
- **Blynk Platform**
- **Sensors:** MQ gas sensor, MPU6050 (temperature + fall detection), HW-827 Heart Rate Sensor (RPM)

---

## 📂 Project Folder Structure

```
nexus-dashboard/
├── src/
│   ├── assets/           # Images, icons
│   ├── components/       # Dashboard, HelmetCard, HelmetMap, etc.
│   ├── data/             # Helmet static data (coordinates, names)
│   ├── services/         # Fetch API, export Excel
│   ├── utils/            # Distance calculation, format timestamp
│   └── App.jsx, index.js
│
├── server/
│   ├── controllers/      # helmetController.js
│   ├── models/           # HelmetModel.js
│   ├── utils/            # connectMongo.js
│   └── saveToMongo.js    # Main Express entry
│
├── .env                  # Mongo URI, Blynk tokens
├── README.md
└── package.json
```

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sanjay6388/Nexus-Smart-Helmet.git
cd nexus-dashboard
```

---

### 2️⃣ Setup and Run Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/nexus
PORT=5000
```

Start the backend server:

```bash
node saveToMongo.js
```

---

### 3️⃣ Setup and Run Frontend (React)

```bash
cd ../
npm install
npm run dev
```

---

## 🧩 Install All Required Dependencies

### ✅ Server (Backend)

```bash
npm install express mongoose dotenv cors body-parser xlsx
```

### ✅ Frontend (React + Tailwind)

```bash
npm install react react-dom react-icons react-router-dom
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
npm install xlsx
npm install vanta three
```

Initialize Tailwind in `tailwind.config.js` and import in `index.css`.

---

## 🛰️ ESP32 + Blynk Integration

### Hardware
- ESP32 board
- MQ Gas Sensor
- MPU6050 (Temperature + Gyroscope for fall detection)
- HW-827 Heart Rate Sensor (RPM)

### Platform
- [Blynk Cloud](https://blynk.cloud/): Configure virtual pins (V1, V2, V3, etc.)

### Data Flow
```
ESP32 Sensors → Blynk Virtual Pins → Frontend via Token → Backend → MongoDB
```

---

## 🧪 Sample API Route

```http
GET /api/helmet/data?token=<BLYNK_TOKEN>
```

Returns:
```json
{
  "temp": 31.8,
  "gas": 98,
  "fall": false,
  "heartrate_rpm": 78,
  "x": 12,
  "y": 14,
  "z": 2
}

```

---

## 📤 Export Data to Excel

Click **"Export to Excel"** in the dashboard — uses the `xlsx` package to generate a `.xlsx` file of current helmet data.

---

## 📈 Helmet Dashboard Preview

- Helmet cards with real-time data
- Gas level and distance tables
- 2D helmet map with connecting lines
- Zoom, drag, and center control
- Export functionality

> Screenshots and live demo coming soon...

---

## 📞 Contact

For questions, suggestions, or collaboration:

**Sanjay Sahani**  
[LinkedIn](https://www.linkedin.com/in/sanjay-sahani-96b81b204/) | [GitHub](https://github.com/Sanjay6388)

---

## 📜 License

This project is open-source under the **MIT License**.
```

