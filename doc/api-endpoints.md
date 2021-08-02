# REST API Endpoints

- BASE URL: `http://localhost:3000/api/v1/`

## 1. Create User

### 1.0. Domain Restrictions

- This endpoint only allow to create end users.
- Admin users can't be created with this endpoint.
- Admin users are created directly into database.

### 1.1. Request Specification

- Method: `POST`

- URI: `user`

- Body

    - `emailAddress`
    - `password`
    - `type` (only `END_USER` is allowed at the moment)

### 1.2. Response Specification

#### 1.2.1. Created (201)

```json
{
  "message": "User created successfully."
}
```

#### 1.2.2. Bad Request (400)

```json
{
  "error": "Email address value must be defined."
}
```

#### 1.2.3. Conflict (409)

```json
{
  "error": "Email address is already taken."
}
```

#### 1.2.4. Internal Server Error (500)

```json
{
  "error": "Internal server error."
}
```

## 2. Find User by ID

### 2.0. Domain Restrictions

- Admin users can access to any user data.
- End user only can access to his data.

### 2.1. Request Specification

- Method: `GET`

- URI: `user`

- Headers

  - `authorization`: `Bearer <token>`
  
- Query

  - `id`

### 2.2. Response Specification

#### 2.2.1. Success (200)

```json
{
  "message": "User obtained successfully.",
  "user": {
    "id": "a3033270-b4f0-45c5-bc49-26e37915bc37",
    "emailAddress": "admin@email.com",
    "type": "ADMIN_USER"
  }
}
```

#### 2.2.2. Unauthorized (401)

```json
{
  "error": "Unauthorized."
}
```

#### 2.2.3. Forbidden (403)

```json
{
  "error": "Forbidden."
}
```

#### 2.2.4. Internal Server Error (500)

```json
{
  "error": "Internal server error."
}
```

## 3. Find Users

### 3.0. Domain Restrictions

- Admin users can access to any user data.
- End user only can access to his data.

### 3.1. Request Specification

- Method: `GET`

- URI: `users`

- Headers

  - `authorization`: `Bearer <token>`

### 3.2. Response Specification

#### 3.2.1. Success (200)

```json
{
  "message": "Users obtained successfully.",
  "users": [
    {
      "id": "a3033270-b4f0-45c5-bc49-26e37915bc37",
      "emailAddress": "admin@email.com",
      "type": "ADMIN_USER"
    },
    {
      "id": "a3033270-b4f0-45c5-bc49-26e37915bc99",
      "emailAddress": "agustin@email.com",
      "type": "END_USER"
    }
  ]
}
```

#### 3.2.2. Unauthorized (401)

```json
{
  "error": "Unauthorized."
}
```

#### 3.2.3. Forbidden (403)

```json
{
  "error": "Forbidden."
}
```

#### 3.2.4. Internal Server Error (500)

```json
{
  "error": "Internal server error."
}
```


## 4. Delete User

### 4.0. Domain Restrictions

- Admin users can delete any user.

### 4.1. Request Specification

- Method: `DELETE`

- URI: `user`

- Headers

  - `authorization`: `Bearer <token>`

- Body

  - `id`

### 4.2. Response Specification

#### 4.2.1. Success (200)

```json
{
  "message": "User deleted successfully."
}
```

#### 4.2.2. Bad Request (400)

```json
{
  "error": "id value must be defined."
}
```

#### 4.2.3. Unauthorized (401)

```json
{
  "error": "Unauthorized."
}
```

#### 4.2.4. Forbidden (403)

```json
{
  "error": "Forbidden."
}
```

#### 4.2.4. Not Found (404)

```json
{
  "error": "Not found."
}
```

#### 4.2.6. Internal Server Error (500)

```json
{
  "error": "Internal server error."
}
```

## 5. Update User

### 5.0. Domain Restrictions

- Admin users can edit anyone's data.
- End users can edit his data only.

### 5.1. Request Specification

- Method: `PATCH`

- URI: `user`

- Headers

  - `authorization`: `Bearer <token>`

- Body

  - `emailAddress` (optional)
  - `password` (optional)

### 5.2. Response Specification

#### 5.2.1. Success (200)

```json
{
  "message": "User updated successfully."
}
```

#### 5.2.2. Bad Request (400)

```json
{
  "error": "Email address value must have valid format."
}
```

#### 5.2.3. Unauthorized (401)

```json
{
  "error": "Unauthorized."
}
```

#### 5.2.4. Forbidden (403)

```json
{
  "error": "Forbidden."
}
```

#### 5.2.5. Conflict (409)

```json
{
  "error": "Email address is already taken."
}
```

#### 5.2.6. Internal Server Error (500)

```json
{
  "error": "Internal server error."
}
```

## 6. Create Session

### 6.1. Request Specification

- Method: `POST`

- URI: `session`

- Body

  - `emailAddress`
  - `password` 

### 6.2. Response Specification

#### 6.2.1. Created (201)

```json
{
  "message": "Session created successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZDYyMDFlZS03MTg0LTQ4MjgtYjk4ZC1lMWJmYjQ1ZDFkODgiLCJpYXQiOjE2Mjc4NjQ0MzEsImV4cCI6MTYyNzg2NDczMX0.dZaEUvVEJG4kt9OPVvmrc3NoWXNp9suSDFuXmYjS6hQ"
}
```

#### 6.2.2. Bad Request (400)

```json
{
  "error": "Email address value must be defined."
}
```

#### 6.2.3. Invalid Credentials (401)

```json
{
  "error": "Invalid credentials."
}
```

#### 6.2.4. Internal Server Error (500)

```json
{
  "error": "Internal server error."
}
```
