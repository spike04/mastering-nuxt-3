import courseData from './courseData'

type Course = {
  title: string
  chapters: Chapter[]
}

type Chapter = {
  title: string
  slug: string
  number: number
  lessons: Lesson[]
}

export type Lesson = {
  title: string
  slug: string
  number: number
  downloadUrl: string
  videoId: number
  text: string
  sourceUrl?: string
  path: string
}

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter) => {
    const lessons: Lesson[] = chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    }))
    return {
      ...chapter,
      lessons,
    }
  })

  return {
    ...courseData,
    chapters,
  }
}
