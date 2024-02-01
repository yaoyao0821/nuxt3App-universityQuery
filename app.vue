<script setup>
  initFavFromLocalStorage()
  await initCountriesList()
</script>
<template>
  <div class="container">
    <h1>Nuxt v3 app</h1>
  
    <NuxtPage />

   <!--  <NuxtWelcome />-->
  </div>
</template>
