# Automobile Web App - Development Documentation

## ✅ Completed

- Express server (Port 3000) with TypeScript
- PostgreSQL + Drizzle ORM connected & synced
- **Routes with UUID-based User IDs:**
    - `/api/v1/auth/register` - POST (public)
    - `/api/v1/auth/login` - POST (public)
    - `/api/v1/auth/me` - GET (protected)
    - `/api/v1/customers` - CRUD (POST, GET, GET/:id, PUT/:id, DELETE/:id)
- User authentication with JWT tokens & bcrypt password hashing
- Auth middleware for protected routes
- Zod schema validation
- Global error handler
- Git initialized with `.gitignore`

## 🚀 Next Steps (Priority Order)

1. **Test the endpoints** - Verify all CRUD operations work in Postman
2. **Other Services** - Finance, Inventory, Workshop, Vehicle, User, Transaction (same pattern as customer)
3. **Authentication** - JWT + Bcrypt (packages ready)
4. **Validators** - Zod schemas for all modules
5. **Testing** - Jest setup
6. **API Docs** - Swagger/OpenAPI
7. **Security** - Rate limiting, CORS, helmet
8. **Logging** - Winston/Pino
9. **Docker** - Containerization
10. **CI/CD** - GitHub Actions

---

## � Commands

```bash
npm run dev          # Start server (watch mode)
npm run db:push      # Sync database
```

## 🧪 Test Endpoints (Postman)

```
# REGISTER (Get token)
POST http://localhost:3000/api/v1/auth/register
{
    "name": "Achint",
    "email": "achint@example.com",
    "password": "password123",
    "mobile": "9876543210"
}

# LOGIN (Get token)
POST http://localhost:3000/api/v1/auth/login
{
    "email": "achint@example.com",
    "password": "password123"
}

# GET PROFILE (Protected - use token in headers)
GET http://localhost:3000/api/v1/auth/me
Header: Authorization: Bearer <token_from_login>

# CREATE CUSTOMER
POST http://localhost:3000/api/v1/customers
{
    "name": "Rahul",
    "mobile": "9876543210",
    "email": "rahul@example.com"
}

# GET ALL CUSTOMERS
GET http://localhost:3000/api/v1/customers

# GET CUSTOMER BY ID
GET http://localhost:3000/api/v1/customers/1

# UPDATE CUSTOMER
PUT http://localhost:3000/api/v1/customers/1
{
    "name": "Updated Name"
}

# DELETE CUSTOMER
DELETE http://localhost:3000/api/v1/customers/1
```

## 📊 Tech Stack

| Component  | Version |
| ---------- | ------- |
| Node.js    | 18+     |
| TypeScript | 6.0.2   |
| Express    | 5.2.1   |
| PostgreSQL | Latest  |
| Drizzle    | 0.45.2  |
| Zod        | 4.3.6   |

## ⚠️ Status

**✅ COMPLETE:** Full CRUD endpoint for customers working!  
**Next:** Test endpoints in Postman, then replicate pattern for other modules
