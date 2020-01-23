'use strict'

const Task = use("App/Models/Task")

/**
 * Controller basico para as tarefas.
 */
class TaskController {

  /**
   * Pagina home das tarefas.
   * Mostra a listagem.
   */
  async index({ view }) {
    const tasks = await Task
      .query()
      .orderBy("done", "ASC")
      .fetch()

    return view.render("task/index", {
      tasks: tasks
    })
  }

  /**
   * Exibe o formulario de cadastro.
   */
  create({ view }) {
    return view.render("task/form")
  }

  /**
   * Salva uma tarefa no DB enviada pelo form.
   */
  async store({ request, response, session }) {

    Task.create({
      title: request.input("title"),
      body : request.input("body")
    })

    session.flash({ notification: {
      type   : "success",
      message: "Task created!"
    }})

    return response.route("task.index")
  }

  /**
   * Exibe formulario de edicao
   */
  async edit({ params, view }) {
    const task = await Task.find(params.id)

    return view.render("task/form", {
      task: task
    })
  }

  /**
   * Salva alteracoes de uma tarefa
   */
  async update({ request, params, response, session }) {
    const task = await Task.find(params.id)
    task.title = request.input("title")
    task.body  = request.input("body")

    await task.save()

    session.flash({ notification: {
      type   : "success",
      message: "Task updated!"
    }})

    return response.redirect("back")
  }

  /**
   * Metodo pra excluir tarefa.
   */
  async destroy({ params, response, session }) {
    const task = await Task.find(params.id)
    task.delete()

    session.flash({ notification: {
      type   : "success",
      message: "Task removed!"
    }})

    return response.route("task.index")
  }

  /**
   * Alterna tarefa pronto ou pendente
   */
  async toggle({ params, session, response }) {
    const task = await Task.find(params.id)
    task.done  = !task.done;

    await task.save()

    session.flash({ notification: {
      type   : "success",
      message: "Task toggled!"
    }})

    return response.redirect("back")
  }
}

module.exports = TaskController
