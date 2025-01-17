// fetchData.js
import supabase from './SupabaseClient'; // Adjust path as needed

async function fetchData() {
  const { data, error } = await supabase
    .from('your_table_name')  // Replace with your actual table name
    .select('*');  // Fetch all columns

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Fetched data:', data);
  }
}

// Automatically call fetchData when the script is run
fetchData()
  .then(() => {
    console.log('Data fetch completed');
  })
  .catch((err) => {
    console.error('Error calling fetchData:', err);
  });
