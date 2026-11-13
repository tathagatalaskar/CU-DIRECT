# Security posture and limitations

## Implemented
- Passwords hashed with bcryptjs (12 rounds).
- JWT validation and active-account check.
- Public registration hardcodes STUDENT role.
- Role middleware protects operational status changes, notice creation and feedback review.
- Helmet headers, configured CORS, JSON body limit, API rate limiting.
- Zod request validation and generic production error responses.
- Mongoose schemas avoid returning password hashes by default.

## Before production
- Replace development JWT secret and enforce secret rotation.
- Use HTTPS and secure deployment secrets.
- Implement refresh-token rotation/revocation and password reset with verified email.
- Add audit-log collection with append-only permissions and comprehensive actor history.
- Add file upload malware scanning, object storage, strict MIME validation and access control before enabling attachments.
- Add CSRF protection if authentication moves to cookies.
- Add account verification, admin provisioning, MFA for privileged accounts and security review.
- Configure CORS to the exact production origin.
- Conduct dependency, penetration, privacy and authorization testing.

CU DIRECT is not university SSO, is not an official university system, and must not be used to handle real emergency dispatch or sensitive student records in its current state.
