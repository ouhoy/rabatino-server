/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
    router.post('/', [BusinessPostsController, 'store'])
    router.get('/:id', [BusinessPostsController, 'show'])
    router.put('/:id', [BusinessPostsController, 'update'])
    router.delete('/:id', [BusinessPostsController, 'destroy'])
  })
  .prefix('/business')

// Education routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [UniversitiesController, 'index'])
        router.post('/', [UniversitiesController, 'store'])
        router.get('/:id', [UniversitiesController, 'show'])
        router.put('/:id', [UniversitiesController, 'update'])
        router.delete('/:id', [UniversitiesController, 'destroy'])
      })
      .prefix('/universities')

    router
      .group(() => {
        router.get('/', [CollegesController, 'index'])
        router.post('/', [CollegesController, 'store'])
        router.get('/:id', [CollegesController, 'show'])
        router.put('/:id', [CollegesController, 'update'])
        router.delete('/:id', [CollegesController, 'destroy'])
      })
      .prefix('/colleges')

    router
      .group(() => {
        router.get('/', [LibrariesController, 'index'])
        router.post('/', [LibrariesController, 'store'])
        router.get('/:id', [LibrariesController, 'show'])
        router.put('/:id', [LibrariesController, 'update'])
        router.delete('/:id', [LibrariesController, 'destroy'])
      })
      .prefix('/libraries')

    router
      .group(() => {
        router.get('/', [StudyCentersController, 'index'])
        router.post('/', [StudyCentersController, 'store'])
        router.get('/:id', [StudyCentersController, 'show'])
        router.put('/:id', [StudyCentersController, 'update'])
        router.delete('/:id', [StudyCentersController, 'destroy'])
      })
      .prefix('/study-centers')

    router
      .group(() => {
        router.get('/', [CoachingCentersController, 'index'])
        router.post('/', [CoachingCentersController, 'store'])
        router.get('/:id', [CoachingCentersController, 'show'])
        router.put('/:id', [CoachingCentersController, 'update'])
        router.delete('/:id', [CoachingCentersController, 'destroy'])
      })
      .prefix('/coaching-centers')
  })
  .prefix('/education')

// Jobs routes
router
  .group(() => {
    router.get('/', [JobPostsController, 'index'])
    router.post('/', [JobPostsController, 'store'])
    router.get('/:id', [JobPostsController, 'show'])
    router.put('/:id', [JobPostsController, 'update'])
    router.delete('/:id', [JobPostsController, 'destroy'])
  })
  .prefix('/jobs')

// Tourism routes
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [HotelsController, 'index'])
        router.post('/', [HotelsController, 'store'])
        router.get('/:id', [HotelsController, 'show'])
        router.put('/:id', [HotelsController, 'update'])
        router.delete('/:id', [HotelsController, 'destroy'])
      })
      .prefix('/hotels')

    router
      .group(() => {
        router.get('/', [RestaurantsController, 'index'])
        router.post('/', [RestaurantsController, 'store'])
        router.get('/:id', [RestaurantsController, 'show'])
        router.put('/:id', [RestaurantsController, 'update'])
        router.delete('/:id', [RestaurantsController, 'destroy'])
      })
      .prefix('/restaurants')

    router
      .group(() => {
        router.get('/', [AttractionsController, 'index'])
        router.post('/', [AttractionsController, 'store'])
        router.get('/:id', [AttractionsController, 'show'])
        router.put('/:id', [AttractionsController, 'update'])
        router.delete('/:id', [AttractionsController, 'destroy'])
      })
      .prefix('/attractions')
  })
  .prefix('/tourism')

router
  .group(() => {
    router.get('/', [PostsController, 'index'])
    router.delete('/:D', [PostsController, 'destroy'])
  })
  .prefix('/posts')
