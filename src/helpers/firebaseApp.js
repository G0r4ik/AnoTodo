import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth'

import { getDatabase, ref, set, child, get, update } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAiGjtLeDSeEEMX1QWRArYMi8TygX_ztbw',
  authDomain: 'site-5f992.firebaseapp.com',
  projectId: 'site-5f992',
  storageBucket: 'site-5f992.appspot.com',
  messagingSenderId: '751961220394',
  appId: '1:751961220394:web:110654a854be7798c62a53',
  databaseURL:
    'https://site-5f992-default-rtdb.europe-west1.firebasedatabase.app/',
}

export const app = initializeApp(firebaseConfig)
let user

const auth = getAuth()
localStorage.removeItem('userIsActive')
onAuthStateChanged(auth, async user2 => {
  if (user2) {
    console.log(user2)
    user = user2
    localStorage.setItem('userIsActive', 'true')
  } else {
    const provider = new GoogleAuthProvider()
    try {
      const res = await signInWithPopup(auth, provider)
      user = res.user
      localStorage.setItem('userIsActive', 'true')
    } catch (error) {
      console.log(error)
    }
  }
})

const database = await getDatabase(app)

export async function editTask(tasks) {
  await update(ref(database, 'tasks/'), { [user.uid]: tasks })
}

export async function getTasks(key, value) {
  const dbRef = ref(getDatabase())
  return await get(child(dbRef, `tasks/${user.uid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log('No data available')
        return null
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export async function isEqualServerAndLocalFolders(oldValue) {
  const serverFolders = await getTasks()
  const clientFolders = oldValue || localStorage.getItem('folders')
  console.log('server: ', serverFolders)
  console.log('client: ', clientFolders)
  return {
    status: serverFolders === clientFolders,
    serverFolders: serverFolders || '[]',
    clientFolders,
  }
}
