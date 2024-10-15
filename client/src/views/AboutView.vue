<template>
  <div>
    <input v-model="newItemName" placeholder="New Item Name" />
    <button @click="addItem">Add Item</button>
    <p v-if="loading">Submitting...</p>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script>
import { ADD_ITEM } from '@/graphql/query';
import { useMutation } from '@vue/apollo-composable';
import { ref } from 'vue';



export default {
  setup() {
    const newItemName = ref('');
    const { mutate, loading, error } = useMutation(ADD_ITEM);

    const addItem = () => {
      mutate({
        name: newItemName.value,
      });
    };

    return {
      newItemName,
      addItem,
      loading,
      error,
    };
  },
};
</script>
