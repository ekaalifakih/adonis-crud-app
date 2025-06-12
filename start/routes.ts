/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ApiProductsController = () => import('#controllers/api/products_controller')
const ApiAuthController = () => import('#controllers/api/auth_controller')

const HttpProductsController = () => import('#controllers/http/products_controller')
const HttpAuthController = () => import('#controllers/http/auth_controller')

// router.on('/').render('pages/home')
router.get('/', [HttpProductsController, 'index'])
router.get('/login', [HttpAuthController, 'loginView'])
router.get('/register', [HttpAuthController, 'registerView'])

//API Routes
router
  .group(() => {
    router.get('/products', [ApiProductsController, 'index'])
    router.post('/products', [ApiProductsController, 'stores'])
    router.get('/products/:id', [ApiProductsController, 'show'])
    router.put('/products/:id', [ApiProductsController, 'update'])
    router.delete('/products/:id', [ApiProductsController, 'destroy'])
  })
  .use(middleware.jwt())
  .prefix('/api')

// Authenticated API Routes
router
  .group(() => {
    router.post('/register', [ApiAuthController, 'register'])
    router.post('/login', [ApiAuthController, 'login'])
  })
  .prefix('/api')

//HTTP Routes
router.group(() => {
  router.get('/products', [HttpProductsController, 'index'])
  router.get('/products/create', [HttpProductsController, 'create'])
  router.post('/products', [HttpProductsController, 'store'])
  router.get('/products/:id', [HttpProductsController, 'showView'])
  router.get('/products/:id/edit', [HttpProductsController, 'editView'])
  router.put('/products/:id', [HttpProductsController, 'update'])
  router.delete('/products/:id', [HttpProductsController, 'destroy'])
})

//Public Routes
