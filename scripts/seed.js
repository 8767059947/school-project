const { query } = require('../src/lib/db'); // Note the path is now '../src/lib/db'
require('dotenv').config({ path: './.env.local' });

// Array of dummy school data
const schoolsData = [
  {
    name: 'Delhi Public School, Pune',
    address: 'Nyati County, Mohammed Wadi',
    city: 'Pune',
    state: 'Maharashtra',
    contact: '9876543210',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937c73?q=80&w=1932&auto=format&fit=crop',
    email_id: 'info@dpspune.com',
  },
  {
    name: 'The Bishop\'s School',
    address: 'General Bhagat Marg, Camp',
    city: 'Pune',
    state: 'Maharashtra',
    contact: '9871234567',
    image: 'https://images.unsplash.com/photo-1592632296446-528ab423eb3b?q=80&w=1740&auto=format&fit=crop',
    email_id: 'contact@bishops.org',
  },
  {
    name: 'Symbiosis International School',
    address: 'Gate No. 3, Symbiosis Viman Nagar Campus',
    city: 'Pune',
    state: 'Maharashtra',
    contact: '9988776655',
    image: 'https://images.unsplash.com/photo-1607578931313-24734b791404?q=80&w=1740&auto=format&fit=crop',
    email_id: 'admissions@sis.ac.in',
  },
];

async function seedSchools() {
  console.log('Starting to seed schools data...');
  
  try {
    for (const school of schoolsData) {
      const insertQuery = `
        INSERT INTO schools (name, address, city, state, contact, image, email_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await query({
        query: insertQuery,
        values: [school.name, school.address, school.city, school.state, school.contact, school.image, school.email_id],
      });
      console.log(`Seeded school: ${school.name}`);
    }
    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ An error occurred during seeding:', error.message);
  }
}

seedSchools();