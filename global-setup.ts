import { FullConfig } from '@playwright/test';


 async function globalSetup(config: FullConfig) {
    // Seed the database via API
    const response = await fetch('http://localhost:3000/api/seed', {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to seed database');
    }
    console.log('✅ Database seeded');
}
export default globalSetup;
