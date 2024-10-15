<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.title }} - {{ todo.username }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_TODOS_WITH_USERNAMES = gql`
  query GetTodosWithUsernames {
    getTodosWithUsernames {
      id
      title
      username
    }
  }
`;

interface Todo {
  id: number;
  title: string;
  username: string;
}

const msg = ref('Hello World');
const todos = ref<Todo[]>([]);

const { result, loading, error } = useQuery(GET_TODOS_WITH_USERNAMES);

watch(result, (newResult) => {
  if (newResult && newResult.getTodosWithUsernames) {
    todos.value = newResult.getTodosWithUsernames;
  }
});
</script>