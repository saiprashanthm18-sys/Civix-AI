# CIVIX AI – Intelligent Civic Issue Orchestration Engine

CIVIX AI is a scalable backend-driven citizen issue processing platform built with Node.js, Express, and MongoDB that transforms how cities manage infrastructure complaints such as potholes, water leaks, power outages, and service disruptions.

## 🚀 Key Features

- **Smart Processing Pipeline**: Uses MongoDB 2dsphere geospatial queries for proximity detection and NLP-based description similarity (Jaro-Winkler) to identify potential duplicates.
- **Auto-Merge Engine**: Automatically merges matching issues into a master record, incrementing impact count and recalculating priority scores.
- **Rule-Based Priority Logic**: Evaluates severity, duplicate frequency, and location sensitivity (e.g., hospitals, high-traffic zones).
- **SLA-Driven Escalation**: Workflows automatically upgrade unresolved issues to "Escalated" status when time thresholds (e.g., 48h) are exceeded.
- **Predictive Risk Analytics**: Forecasts potential infrastructure failures by identifying high-risk geographic clustering patterns and temporal frequency spikes.
- **Premium Dashboards**: Role-based views for Citizens and Administrators with interactive charts (Radar, Polar, Line) and real-time status tracking.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, natural (NLP).
- **Frontend**: Vite, React, Chart.js, Lucide-React, Framer Motion.
- **Design**: Vanilla CSS (Modern Glassmorphism, Premium Aesthetics).

## 📂 Project Structure

- `server/`: Express backend with models, routes, controllers, and services (Geo, NLP, Priority).
- `client/`: Vite + React frontend with a high-fidelity dashboard.

## 🚦 Getting Started

### Prerequisites:
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)

### 1. Backend Setup:
`cd server`
`npm install`
`npm start`

### 2. Frontend Setup:
`cd client`
`npm install`
`npm run dev`

---

Built with performance, scalability, and premium civic management in mind.
