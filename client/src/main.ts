import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import client from './graphql/apollo-client';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, client);
  },
  render: () => h(App),
});

app.use(router);
app.mount('#app');