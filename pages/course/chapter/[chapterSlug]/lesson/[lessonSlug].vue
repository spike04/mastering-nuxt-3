<script setup>
const course = useCourse()
const route = useRoute()

console.log(route.params.lessonSLug)

definePageMeta({
  middleware: function ({ params }, from) {
    const course = useCourse()

    const chapter = course.chapters.find(
      (chapter) => chapter.slug === params.chapterSlug
    )

    if (!chapter) {
      throw abortNavigation(
        createError({
          statusCode: 404,
          message: 'Chapter not found',
        })
      )
    }

    const lesson = chapter.lessons.find(
      (lesson) => lesson.slug === params.lessonSlug
    )

    if (!lesson) {
      throw abortNavigation(
        createError({
          statusCode: 404,
          message: 'Lesson not found',
        })
      )
    }
  },
})

const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  )
})

const lesson = computed(() => {
  return chapter.value.lessons.find(
    (lesson) => lesson.slug === route.params.lessonSlug
  )
})

const title = computed(() => {
  return `${lesson.value.title} - ${course.title}`
})

useHead({ title })

const progress = useLocalStorage('progress', [])

const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false
  }

  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false
  }

  return progress.value[chapter.value.number - 1][lesson.value.number - 1]
})

const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = []
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
    !isLessonComplete.value
}

const throwError = () => {
  throw createError('Could not update')
}
</script>

<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <a
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :href="lesson.sourceUrl"
      >
        Download Source Code
      </a>
      <a
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :href="lesson.downloadUrl"
      >
        Download Video
      </a>
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="throwError"
    />
  </div>
</template>
