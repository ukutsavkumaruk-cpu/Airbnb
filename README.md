# Airbbnb
This Airbnb project is mainly backend focused.

Day: 02/10/2026
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

Day: 03/10/2026

->  Deleted the favourite collection and model from database and file respectively. 
->  Rebuit the logic for rendering,adding and deleting Favourites, from a particular user's list.
    Now user can save their favourite homes indivisually.

  
