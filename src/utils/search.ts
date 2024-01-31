import { client, RedisClient } from '../instance/redis';

class Search {
  private redisClient: RedisClient;

  constructor() {
    // Initialize your Redis client. Make sure to replace the placeholder values with your actual Redis server information.
    this.redisClient = client;
  }

  async searchUser(userhash: string): Promise<any> {
    try {
      const userListKey = 'users';
      // Retrieve the list of users from Redis
      const userList = await client.lrange(userListKey, 0, -1);

      // Iterate through the list to find the user with the matching email
      for (const userString of userList) {
        const user = JSON.parse(userString);
        if (user.user === userhash) {
          return user; // Found the user with the matching email
        }
      }

      // User not found
      return null;
    } catch (error) {
      console.error('Error searching for user by email:', error);
      throw error;
    }
  }

  async findCluster(userhash: string): Promise<boolean | string> {
    try {
      const result = await client.hget('cluster', userhash);

      if (result) {
        // Parse the result if it exists
        const user = JSON.parse(result);
        return user;
      } else {
        // User not found
        return false;
      }
    } catch (error) {
      console.error('Error getting user from Redis:', error);
      throw error;
    }
  }
}

export default Search;
// Example usage
const searchInstance = new Search();

searchInstance
  .findCluster(
    '71ae28a076943b7a62f700e5a28e0e4a4dcda86a2057630b3a0352a33f3d310b',
  )
  .then((r) => {
    console.log(r);
  })
  .catch((err) => {
    console.log(err);
  });

// searchInstance
//   .searchUser(
//     '224f90d97d696279b52e9829669adc6d01c78df9668d8bfe54ce3f204f1d543b',
//   )
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

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

// Don't forget to close the Redis connection when done

// // Search by ID
// const resultByID = searchInstance.searchByID(2);
// console.log('Search by ID:', resultByID);

// // Search by email
// const resultByEmail = searchInstance.searchByEmail('alice@example.com');
// console.log('Search by Email:', resultByEmail);

// Get all data (for demonstration purposes)
// const allData = searchInstance.getAllData();
// console.log('All Data:', allData);
