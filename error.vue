<script setup>
const error = useError()

const handleError = () => {
  clearError({
    redirect:
      '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3',
  })
}
</script>

<template>
  <NuxtLayout name="404">
    <div
      class="p-12 bg-gray-100 w-full max-w-full h-full min-h-screen flex flex-col items-center space-y-4"
    >
      <h1 class="text-4xl font-bold">{{ error?.statusCode }}</h1>
      <div class="text-xl">{{ error?.message }}</div>
      <p>
        Go to the
        <a class="hover:cursor-pointer underline" @click="handleError">
          First Lesson</a
        >
      </p>
    </div>
  </NuxtLayout>
</template>
