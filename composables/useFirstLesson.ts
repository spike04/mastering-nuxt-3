import { Lesson } from './useCourse'

export default (): Lesson => {
  const { chapters } = useCourse()

  return chapters[0].lessons[0]
}
