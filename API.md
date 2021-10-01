# API

> Be aware! The API is subject to change!

## Endpoints

### Create a short-url

```http
POST /create
```

**Request**

```jsonc
{
    "short_code_request": "short_code_request", // optional
    "url": "url_to_short" // required
}
```

**Response**

200 OK

```jsonc
{
    "short_code": "short_code",
    "url": "the_url_given"
}
```

409 Conflict

```jsonc
{
    "error": "short-code already in use!"
}
```

---

### Use a short-url

```http
GET /:short_code
```

**Request**

none

**Response**

404 Not Found

> This response is given back but you will still be redirected
