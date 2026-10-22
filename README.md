# K-TRAVEL PICKS v41 (2026-10-22)

- Based on verified GitHub main/index.html v40 blob SHA `3aa2a8753bada09d853176b61f803a36a376e1c6`.
- Added saved-trip search (name, destination, dates, departure airport), sort by save date/departure date/city, and duplicate trip plan without overwriting original.
- Mobile saved-list layout improved. Existing 24 destinations, 120 attractions, itinerary generation, cost inputs, localStorage and JSON import/export are preserved in source and tested in Chromium.
- No new third-party photos. Inherited 179 photo metadata entries from v40; individual copyright metadata not reverified in v41. Unverified destinations use clearly labeled placeholders.
- No paid API. The website fetches external photos from Wikimedia Commons only when online.
- GitHub deployment: NOT completed. update_file returned HTTP 403 Resource not accessible by integration; remote main/index.html remained v40. GitHub Pages public URL was not accessible to the checker. See test_report.json.
- Browser test: 26 checks passed with in-memory localStorage mock because Chromium blocked local navigation. External photos were blocked; live photo rights and current prices not verified.
- photo_sources.json contains inherited source records, not newly revalidated v41 records.
