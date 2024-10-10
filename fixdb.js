const Database = require("better-sqlite3");

// Connect to your SQLite database
const db = new Database("meals.db");
function deleteFaultyMeal() {
  // Step 1: Check if the entry exists
  const faultyEntry = db
    .prepare(`SELECT id FROM meals WHERE slug = ?`)
    .get("the-great-dish");

  if (faultyEntry) {
    // Step 2: Delete the entry where slug is 'the-great-dish'
    const stmt = db.prepare(`
        DELETE FROM meals
        WHERE slug = ?;
      `);

    const info = stmt.run("the-great-dish");
    console.log(`Rows deleted: ${info.changes}`);
  } else {
    console.log('No entries found with the slug "the-great-dish".');
  }
}

// Run the delete
deleteFaultyMeal();
