<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRouteTitle } from './hooks';

useRouteTitle();
</script>

<template>
  <RouterView />
</template>
