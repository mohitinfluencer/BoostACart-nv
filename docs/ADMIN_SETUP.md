# Admin Panel Security Setup

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Admin Authentication
ADMIN_USERNAME=memohit
ADMIN_PASSWORD=mohitmossi7738
SESSION_SECRET=your-very-long-random-secret-key-at-least-32-characters
```

**Important:** Generate a secure random string for `SESSION_SECRET` in production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## How It Works

### 1. Cookie-Based Sessions
- Login creates an encrypted JWT cookie (`admin_session`)
- Cookie settings:
  - `httpOnly: true` - Cannot be accessed by JavaScript
  - `secure: true` - Only sent over HTTPS in production
  - `sameSite: strict` - CSRF protection
  - `maxAge: 24h` - Session expires after 24 hours

### 2. Route Protection
- Admin panel at `/memohit` checks authentication on mount
- If not authenticated, shows login screen
- Session verified via `/api/admin/verify` endpoint

### 3. Security Features
- Rate limiting: 5 failed login attempts
- 15-minute lockout after max attempts
- IP-based tracking (uses `x-forwarded-for` header)
- Credentials read from environment variables
- Fallback values if env vars missing (shows console warning)

### 4. API Endpoints

#### `POST /api/admin/login`
Authenticates user and creates session cookie.

**Request:**
```json
{
  "username": "memohit",
  "password": "mohitmossi7738"
}
```

**Response (Success):**
```json
{
  "success": true
}
```

**Response (Failed):**
```json
{
  "error": "Invalid credentials",
  "remainingAttempts": 4
}
```

#### `POST /api/admin/logout`
Clears session cookie.

#### `GET /api/admin/verify`
Checks if current session is valid.

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "username": "memohit",
    "role": "admin"
  }
}
```

## Testing Checklist

- [ ] Login with correct credentials works
- [ ] Login with incorrect credentials shows error
- [ ] After 5 failed attempts, account locks for 15 minutes
- [ ] Session persists on page refresh
- [ ] Logout clears session
- [ ] Direct access to `/memohit` without login redirects to login screen
- [ ] Session expires after 24 hours
- [ ] No hard-coded credentials in code (all from env vars)

## Security Notes

- This is a temporary auth solution for internal admin use
- For production, consider implementing:
  - Multi-user admin system with database-backed accounts
  - Role-based access control (RBAC)
  - 2FA authentication
  - Audit logging for all admin actions
  - Password hashing with bcrypt
  - Session management with Redis

## Accessing the Admin Panel

1. Navigate to: `https://your-domain.com/memohit`
2. Enter credentials
3. Manage stores and plans

**Note:** The `/memohit` route is not linked anywhere in the public interface. It must be accessed directly via URL.
```

```typescript file="" isHidden
