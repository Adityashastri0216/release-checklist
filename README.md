# Release Checklist Tool

A simple Release Checklist Tool built with React, Express, Prisma, and PostgreSQL.

## Features

- Create a new release
- View all releases
- Auto-computed release status
  - Planned
  - Ongoing
  - Done
- Check/Uncheck release steps
- Update additional information
- Delete release
- Responsive and clean UI

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL

---

## Project Structure

```
release-checklist/

client/
server/
README.md
```

---

## Installation

### Clone

```bash
git clone <repository-url>
```

---

### Backend

```bash
cd server

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

### Frontend

```bash
cd client

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Endpoints

### Get All Releases

```
GET /api/releases
```

---

### Create Release

```
POST /api/releases
```

Body

```json
{
  "name":"Version 1",
  "dueDate":"2026-07-26",
  "additional":"Deploy tonight"
}
```

---

### Update Steps

```
PATCH /api/releases/:id/steps
```

Body

```json
{
  "steps":{
    "QA Testing":true
  }
}
```

---

### Update Additional Information

```
PATCH /api/releases/:id
```

Body

```json
{
  "additional":"Updated Notes"
}
```

---

### Delete Release

```
DELETE /api/releases/:id
```

---

## Database Schema

### Release

| Field | Type |
|-------|------|
| id | Int |
| name | String |
| dueDate | DateTime |
| additional | String |
| steps | JSON |
| createdAt | DateTime |

---

## Status Logic

No completed steps

```
planned
```

Some completed

```
ongoing
```

All completed

```
done
```

---

## Author

Aditya Shastri