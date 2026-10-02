# Airbbnb
This Airbnb project is mainly backend focused.

02/10/2026
## Troubleshooting

### BSON Version Error

If you get an error like:

`Unsupported BSON version, bson types must be from bson 6.x.x`

This can happen when `mongoose` and `connect-mongodb-session`
use incompatible MongoDB/BSON driver versions.

For example:

- Mongoose 9 → MongoDB 7 → BSON 7
- connect-mongodb-session 5 → MongoDB 6 → BSON 6

Make sure both packages use compatible MongoDB/BSON versions.

In this project, Mongoose 8 is used to stay compatible with
`connect-mongodb-session@5`.
