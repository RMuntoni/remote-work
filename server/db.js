// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "movies"
knex.schema
  // Make sure no "movies" table exists
  // before trying to create new
  .hasTable('movies')
    .then((exists) => {
      if (!exists) {        
        // create new movies table,        
        return knex.schema.createTable('movies', (table)  => {
          table.integer('id').primary();
          table.string('title');
          table.string('description');
          table.string('rating');
          table.boolean('adult');
          table.string('imagePath');
        })
        .then(() => {
          // Log success message
          console.log('Table \'movies\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        });
      }
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    });

// Create a table in the database called "genres"
knex.schema
  // Make sure no "genres" table exists
  // before trying to create new
  .hasTable('genres')
    .then((exists) => {
      if (!exists) {        
        // create new genres table,        
        return knex.schema.createTable('genres', (table)  => {
          table.integer('id').primary();
          table.string('name');
        })
        .then(() => {
          // Log success message
          console.log('Table \'genres\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        });
      }
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    });

// Create a table in the database called "movies_genres"
knex.schema
  // Make sure no "movies_genres" table exists
  // before trying to create new
  .hasTable('movies_genres')
    .then((exists) => {
      if (!exists) {        
        // create new movies_genres table,        
        return knex.schema.createTable('movies_genres', (table)  => {
          table.increments('id').primary()
          table
          .integer('movie_id')
          .references('id')
          .inTable('movies')
          table
          .integer('genre_id')
          .references('id')
          .inTable('genres')
        })
        .then(() => {
          // Log success message
          console.log('Table \'movies_genres\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        });
      }
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    });



// Export the database
module.exports = knex