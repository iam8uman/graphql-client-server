<template>
  <div>
    <h1>GraphQL Data:</h1>
    <ul v-if="result && result.value.getAllTodos">
      <li v-for="item in result.value.getAllTodos" :key="item.title">
        {{ item.title }} - {{ item.user.name }} - {{ item.completed ? 'Completed' : 'Not Completed' }}
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script setup>
import { GET_ALL_TODOS } from '@/graphql/query';
import { useQuery } from '@vue/apollo-composable';

// Fetch todos using the useQuery composable
const { result, loading, error } = useQuery(GET_ALL_TODOS);

// Debug: Log the result to ensure data is being fetched
console.log("result",result.value); 

// Debugging if there is an error
if (error) {
  console.error("GraphQL error:", error.message);
}
</script>
