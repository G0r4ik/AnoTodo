import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import AppError from '@/components/AppError.vue'
import { $t } from './localize'

const pinia = createPinia()
const app = createApp(App)

const modules = import.meta.glob('./components/{icons,ui}/*.vue', {
  eager: true,
})

for (const path in modules) {
  const componentName = path.split('/').at(-1).split('.')[0]
  app.component(`${componentName}`, modules[path].default)
}
app.component('AppError', AppError)

app.config.globalProperties.$t = $t
app.use(pinia)
app.mount('#app')

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//   .then(result => {
//     const credential = GoogleAuthProvider.credentialFromResult(result)
//     const token = credential.accessToken
//     const user = result.user
//     console.log(1)
//   })
//   .catch(error => {
//     // console.log(error)
//   })

// getRedirectResult(auth)
//   .then(result => {
//     console.log(result)
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result)
//     const token = credential.accessToken

//     // The signed-in user info.
//     const user = result.user
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   })
//   .catch(error => {
//     // Handle Errors here.
//     console.log(error)
//     const errorCode = error.code
//     const errorMessage = error.message
//     // The email of the user's account used.
//     const email = error.customData.email
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error)
//     // ...
//   })
