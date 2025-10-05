# Strava Data Fetcher

A tool that automatically fetches real race data from your Strava activities and creates properly formatted markdown files for your Astro races page.

## Features

- 🔍 **Real Data Extraction**: Fetches actual activity data from Strava URLs
- 📅 **Proper Naming**: Creates files with `YYYY-MM-DD-meaningful-title.md` format
- 🌍 **Bilingual Support**: Generates both English and Danish content
- 🏃‍♂️ **Race Categories**: Automatically categorizes activities (marathon, half-marathon, 10k, etc.)
- 📊 **Rich Data**: Extracts distance, time, pace, location, and activity type
- 🔗 **Strava Links**: Includes working links back to original activities

## Usage

1. **Add your Strava activities** to `strava.md` file (one URL per line with `- ` prefix)
2. **Run the fetcher**:
   ```bash
   node fetch-strava-data.js
   ```
3. **Review generated files** in `src/content/races/`
4. **Customize** race reports and add photos/videos

## Example strava.md format

```markdown
- https://www.strava.com/activities/15721472352/overview
- https://www.strava.com/activities/15527823118/overview
- https://www.strava.com/activities/15242549078/overview
```

## Generated Output

The tool creates markdown files with:

- **Frontmatter**: All race metadata (name, date, location, distance, etc.)
- **Race Report**: Structured content with training details
- **Strava Links**: Direct links to original activities
- **Bilingual Content**: Both English and Danish versions

## Rate Limiting

The tool includes:

- ⏱️ **1-second delays** between requests
- 🔢 **20-activity limit** per run
- 🛡️ **Error handling** for failed requests

## Next Steps

After running the tool:

1. Review and edit the generated race reports
2. Add real photos and videos
3. Update race descriptions with personal details
4. Add project links for significant races
5. Run again to fetch more activities

---

**Note**: This tool respects Strava's servers with rate limiting and error handling. For large numbers of activities, consider running it in batches.
