<template>
  <div>
    <h1>GraphQL Data:</h1>
    <ul v-if="result && result.data && result.data.getAllTodos">
      <li v-for="item in result.data.getAllTodos" :key="item.title">
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

const { result, loading, error } = useQuery(GET_ALL_TODOS);
</script> 