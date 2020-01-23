'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home').as('home')

Route.group(() => {

  // Rotas prontas de crud
  Route.resource('task', 'TaskController')

  // Rota de toggle
  Route.get('task/:id/toggle', 'TaskController.toggle').as('task.toggle')
})
