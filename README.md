# BeWater API

A Deno-based REST API for the BeWater ecosystem, providing endpoints for challenge management and Cantonese corpus data.

Base URL: `https://bewater-api.deno.dev`

## 🚀 Quick Start

### Prerequisites

- [Deno](https://deno.land/) installed
- Supabase project with proper environment variables set

### Environment Variables

Create a `.env` file or set the following environment variables:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PWD=your_admin_password
```

### Running the Server

```bash
deno run --allow-net --allow-env --allow-read main.tsx
```

The server will start on port 8000.

## 📚 API Endpoints

### 1. Health Check
**GET** `/`

Returns a simple health check message.

**Response:**
```json
{
  "result": "Hello, Devs for BeWater!"
}
```

**Example:**
```bash
curl -X GET https://bewater-api.deno.dev
```

---

### 2. Get Challenge by Title
**POST** `/challenge`

Retrieves challenge information by title from the BeWater database.

**Request Body:**
```json
{
  "title": "BeWater Monthly Hackathon 0x02"
}
```

**Response:**
```json
[
  {
    "id": 165,
    "externalId": "UKxp-BeWater-Monthly-Hackathon-0x02",
    "title": "BeWater Monthly Hackathon 0x02",
    "description": "* Hackathon 评选不透明...",
    "hostName": "BeWaterDAO",
    "startTime": "2025-07-31T16:00:00",
    "endTime": "2025-08-30T16:00:00",
    "status": "ACTIVE",
    "location": "ONLINE",
    "challengeTags": ["cantonese", "bewater", "DAO"],
    "milestones": [...],
    "createdAt": "2025-07-29T12:27:05.736",
    "updatedAt": "2025-07-29T13:20:28.604"
  }
]
```

**Example:**
```bash
curl -X POST https://bewater-api.deno.dev/challenge \
  -H "Content-Type: application/json" \
  -d '{"title": "BeWater Monthly Hackathon 0x02"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

---

**Note**: This API is part of the BeWater ecosystem and is designed to work with the BeWater challenge platform and AI DimSum Cantonese corpus project. 