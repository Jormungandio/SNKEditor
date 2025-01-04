use tauri_plugin_sql::{Migration, MigrationKind};

pub fn migrate_db() -> Vec<Migration> {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE note (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      name TEXT,
                                      text TEXT,
                                      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                      tag TEXT,
                                      folder_id INTEGER,
                                      FOREIGN KEY (folder_id) REFERENCES folders(id)
                );
                CREATE TABLE note_dir (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    note_id INTEGER,
                    folder_id INTEGER,
                    FOREIGN KEY (note_id) REFERENCES note(id),
                    FOREIGN KEY (folder_id) REFERENCES folders(id)
                );
                CREATE TABLE folders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    folder_name TEXT NOT NULL,
                    folder_path TEXT NOT NULL
                );
                CREATE TRIGGER update_timestamp
                AFTER UPDATE ON note
                FOR EACH ROW
                BEGIN
                    UPDATE note
                    SET updated_at = CURRENT_TIMESTAMP
                    WHERE id = OLD.id;
                END;",
            kind: MigrationKind::Up,
        },
    ];
    migrations
}
