<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const gotoPath = route.params.path as string;

router.replace({ path: gotoPath });
</script>

<template>
  <div></div>
</template>
