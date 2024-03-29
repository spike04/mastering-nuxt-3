export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistory = useLocalStorage<string[]>('history', [])
  navigationHistory.value.push(to.path)

  console.log(`Navigation history: ${navigationHistory.value.join('\n')}`)
})
