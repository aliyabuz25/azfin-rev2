const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function seedDatabase() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'azfin_user',
        password: 'azfin_password',
        database: 'azfin_db'
    });

    try {
        const defaultsPath = path.join(__dirname, '../frontend/siteContentDefaults.json');
        const defaults = JSON.parse(fs.readFileSync(defaultsPath, 'utf-8'));

        const content = JSON.stringify(defaults);
        await pool.execute(
            'INSERT INTO site_settings (id, content) VALUES (1, ?) ON DUPLICATE KEY UPDATE content = ?',
            [content, content]
        );

        console.log('✅ Database seeded successfully with default content');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seedDatabase();
