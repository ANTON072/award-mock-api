import { Hono } from 'hono'
import {
  VerifyFirebaseAuthConfig,
  VerifyFirebaseAuthEnv,
  verifyFirebaseAuth,
  getFirebaseToken,
} from '@hono/firebase-auth'

const config: VerifyFirebaseAuthConfig = {
  // specify your firebase project ID.
  projectId: 'award-project-7042e',
}

const app = new Hono<{ Bindings: VerifyFirebaseAuthEnv }>()

app.use('*', verifyFirebaseAuth(config))
app.get('/hello', (c) => {
  const idToken = getFirebaseToken(c) // get id-token object.
  return c.json(idToken)
})

export default app
