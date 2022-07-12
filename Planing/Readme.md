# Hebrew Calendar App
User stories ('As a user...')
- View all calendar items from API
  - import all calendar items to different schemas according to type
  - look for all calendar entries
  - display all calendar entries

- View single calendar item from API
  - look for one calendar item
  - display single item searched for
  - Save single calendar item to personal folder

- Personal folder - View all items
  - look for all items in personal folder
  - display all items in personal folder

- Personal folder - Create new entry
  - new schemas (different schemas depending on event type)
  - create the different models to use

- Personal folder - Edit a single entry
  - look for a single entry
  - edit that entry
  - get back the updated version

- Personal folder - Delete single entry
  - look for a single entry
  - remove entry from db
  - display confirmation


Schemas
- Candle lighting
  - title: String / time
  - time: date / time
  - memo: string
  - hebrew: string

- Havdala
  - title: string / time
  - time: date / time
  - hebrew: string

- New month
  - title: String
  - date: date
  - Hebrew date: string
  - hebrew: string
  - memo: string

- Holidays
  - title: string
  - date: string
  - hebrew date: string
  - yomtov: Boolean
  - hebrew: string
  - memo: string

- Fasts - beginning and ending
  - Title: string
  - Date: string
  - hebrew: string
  - memo: string