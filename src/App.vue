<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/linechart">Linechart</RouterLink>
      <RouterLink to="/columnbar">Columnbar</RouterLink>
      <RouterLink to="/rowbarchart">Rowbar</RouterLink>
      <RouterLink to="/piechart">Piechart</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
