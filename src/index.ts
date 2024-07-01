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

// You can specify here the extended VerifyFirebaseAuthEnv type.
//
// If you do not specify `keyStore` in the configuration, you need to set
// the variables `PUBLIC_JWK_CACHE_KEY` and `PUBLIC_JWK_CACHE_KV` in your
// wrangler.toml. This is because `WorkersKVStoreSingle` is used by default.
//
// For more details, please refer to: https://github.com/Code-Hex/firebase-auth-cloudflare-workers
const app = new Hono<{ Bindings: VerifyFirebaseAuthEnv }>()

// set middleware
app.use('*', verifyFirebaseAuth(config))
app.get('/hello', (c) => {
  const idToken = getFirebaseToken(c) // get id-token object.
  return c.json(idToken)
})

export default app
