// import * as redis from 'redis';
// import { client } from 'src/instance/redis';

// class Search {
//   private redisClient: redis.redisClient;

//   constructor() {
//     // Initialize your Redis client. Make sure to replace the placeholder values with your actual Redis server information.
//     this.redisClient = client;
//   }

//   searchByEmail(email: string): Promise<string | null> {
//     return new Promise((resolve, reject) => {
//       // Implement your Redis search logic by email here
//       this.redisClient.get(`email:${email}`, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }

//   searchByID(id: string): Promise<string | null> {
//     return new Promise((resolve, reject) => {
//       // Implement your Redis search logic by ID here
//       this.redisClient.get(`id:${id}`, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }

//   // Add more search methods as needed

//   closeConnection(): void {
//     // Close the Redis connection when it's no longer needed
//     this.redisClient.quit();
//   }
// }

// // Example usage
// const searchInstance = new Search();

// searchInstance
//   .searchByEmail('example@email.com')
//   .then((result) => {
//     console.log('Search by Email Result:', result);
//   })
//   .catch((error) => {
//     console.error('Error searching by Email:', error);
//   });

// searchInstance
//   .searchByID('123')
//   .then((result) => {
//     console.log('Search by ID Result:', result);
//   })
//   .catch((error) => {
//     console.error('Error searching by ID:', error);
//   });

// // Don't forget to close the Redis connection when done
// searchInstance.closeConnection();

// // Search by ID
// const resultByID = searchInstance.searchByID(2);
// console.log('Search by ID:', resultByID);

// // Search by email
// const resultByEmail = searchInstance.searchByEmail('alice@example.com');
// console.log('Search by Email:', resultByEmail);

// // Get all data (for demonstration purposes)
// // const allData = searchInstance.getAllData();
// // console.log('All Data:', allData);
