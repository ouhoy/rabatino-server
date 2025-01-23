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
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

const PostsController = () => import('#controllers/posts_controller')
const UniversitiesController = () => import('#controllers/education/universities_controller')
const CollegesController = () => import('#controllers/education/colleges_controller')
const LibrariesController = () => import('#controllers/education/libraries_controller')
const StudyCentersController = () => import('#controllers/education/study_centers_controller')
const CoachingCentersController = () => import('#controllers/education/coaching_centers_controller')
const JobPostsController = () => import('#controllers/jobs/job_posts_controller')
const HotelsController = () => import('#controllers/tourism/hotels_controller')
const RestaurantsController = () => import('#controllers/tourism/restaurants_controller')
const AttractionsController = () => import('#controllers/tourism/attractions_controller')

const BusinessPostsController = () => import('#controllers/business/business_posts_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Business routes
router
  .group(() => {
    router.get('/', [BusinessPostsController, 'index'])
    router.post('/', [BusinessPostsController, 'store']).use(middleware.auth())
    router.get('/:id', [BusinessPostsController, 'show'])
    router.put('/:id', [BusinessPostsController, 'update']).use(middleware.auth())
    router.delete('/:id', [BusinessPostsController, 'destroy']).use(middleware.auth())
  })
  .prefix('/business')

// Education routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [UniversitiesController, 'index'])
        router.post('/', [UniversitiesController, 'store']).use(middleware.auth())
        router.get('/:id', [UniversitiesController, 'show'])
        router.put('/:id', [UniversitiesController, 'update']).use(middleware.auth())
        router.delete('/:id', [UniversitiesController, 'destroy']).use(middleware.auth())
      })
      .prefix('/universities')

    router
      .group(() => {
        router.get('/', [CollegesController, 'index'])
        router.post('/', [CollegesController, 'store']).use(middleware.auth())
        router.get('/:id', [CollegesController, 'show'])
        router.put('/:id', [CollegesController, 'update']).use(middleware.auth())
        router.delete('/:id', [CollegesController, 'destroy']).use(middleware.auth())
      })
      .prefix('/colleges')

    router
      .group(() => {
        router.get('/', [LibrariesController, 'index'])
        router.post('/', [LibrariesController, 'store']).use(middleware.auth())
        router.get('/:id', [LibrariesController, 'show'])
        router.put('/:id', [LibrariesController, 'update']).use(middleware.auth())
        router.delete('/:id', [LibrariesController, 'destroy']).use(middleware.auth())
      })
      .prefix('/libraries')

    router
      .group(() => {
        router.get('/', [StudyCentersController, 'index'])
        router.post('/', [StudyCentersController, 'store']).use(middleware.auth())
        router.get('/:id', [StudyCentersController, 'show'])
        router.put('/:id', [StudyCentersController, 'update']).use(middleware.auth())
        router.delete('/:id', [StudyCentersController, 'destroy']).use(middleware.auth())
      })
      .prefix('/study-centers')

    router
      .group(() => {
        router.get('/', [CoachingCentersController, 'index'])
        router.post('/', [CoachingCentersController, 'store']).use(middleware.auth())
        router.get('/:id', [CoachingCentersController, 'show'])
        router.put('/:id', [CoachingCentersController, 'update']).use(middleware.auth())
        router.delete('/:id', [CoachingCentersController, 'destroy']).use(middleware.auth())
      })
      .prefix('/coaching-centers')
  })
  .prefix('/education')

// Jobs routes
router
  .group(() => {
    router.get('/', [JobPostsController, 'index'])
    router.post('/', [JobPostsController, 'store']).use(middleware.auth())
    router.get('/:id', [JobPostsController, 'show'])
    router.put('/:id', [JobPostsController, 'update']).use(middleware.auth())
    router.delete('/:id', [JobPostsController, 'destroy']).use(middleware.auth())
  })
  .prefix('/jobs')

// Tourism routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [HotelsController, 'index'])
        router.post('/', [HotelsController, 'store']).use(middleware.auth())
        router.get('/:id', [HotelsController, 'show'])
        router.put('/:id', [HotelsController, 'update']).use(middleware.auth())
        router.delete('/:id', [HotelsController, 'destroy']).use(middleware.auth())
      })
      .prefix('/hotels')

    router
      .group(() => {
        router.get('/', [RestaurantsController, 'index'])
        router.post('/', [RestaurantsController, 'store']).use(middleware.auth())
        router.get('/:id', [RestaurantsController, 'show'])
        router.put('/:id', [RestaurantsController, 'update']).use(middleware.auth())
        router.delete('/:id', [RestaurantsController, 'destroy']).use(middleware.auth())
      })
      .prefix('/restaurants')

    router
      .group(() => {
        router.get('/', [AttractionsController, 'index'])
        router.post('/', [AttractionsController, 'store']).use(middleware.auth())
        router.get('/:id', [AttractionsController, 'show'])
        router.put('/:id', [AttractionsController, 'update']).use(middleware.auth())
        router.delete('/:id', [AttractionsController, 'destroy']).use(middleware.auth())
      })
      .prefix('/attractions')
  })
  .prefix('/tourism')

router
  .group(() => {
    router.get('/', [PostsController, 'index'])
    router.get('/search', [PostsController, 'search'])
    router.get('/tourism', [PostsController, 'tourismPosts'])
    router.get('/education', [PostsController, 'educationalPosts'])
    router.get('/jobs', [PostsController, 'jobPosts'])
    router.delete('/:id', [PostsController, 'destroy']).use(middleware.auth())
  })
  .prefix('/posts')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).use(middleware.guest())
    router.post('/register', [RegisterController, 'store']).use(middleware.guest())

    router.get('/login', [LoginController, 'show']).use(middleware.guest())
    router.post('/login', [LoginController, 'store']).use(middleware.guest())

    router.post('/logout', [LogoutController, 'handle']).use(middleware.auth())
  })
  .prefix('/auth')
