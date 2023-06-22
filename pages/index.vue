<script setup>
const firstLesson = useFirstLesson()
</script>

<template>
  <div>
    <NuxtLink class="underline font-medium" :href="firstLesson.path">
      Go to first lesson
    </NuxtLink>
  </div>
</template>
