export default defineNuxtPlugin(() => {
  const userAuth = localStorage.getItem('sessionId')

  const router = useRouter()

  const $customFetch = $fetch.create({
    onRequest({ request, options, error }) {
      if (userAuth) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${ localStorage.getItem('sessionId') }`
        }
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        router.push('/login')
      }
    }
  });

  return {
    provide: {
      customFetch: $customFetch
    }
  }
})