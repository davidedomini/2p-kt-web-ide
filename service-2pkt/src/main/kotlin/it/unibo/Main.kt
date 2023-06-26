package it.unibo

import com.google.gson.Gson
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import it.unibo.controller.Controller
import it.unibo.request.ComputationRequest

val controller = Controller()

fun Application.module() {

    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Get)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader(HttpHeaders.ContentType)
        anyHost()
    }

    routing {
        post("/solveAll") {
            val request = call.receiveText()
            val computationRequest = Gson().fromJson(request, ComputationRequest::class.java)
            val response = controller.solveAll(computationRequest)
            call.respondText(response, ContentType.Text.Plain)
        }

        post("/solveNext") {
            val request = call.receiveText()
            val computationRequest = Gson().fromJson(request, ComputationRequest::class.java)
            val response = controller.solveNext(computationRequest)
            call.respondText(response, ContentType.Text.Plain)
        }

        post("/reset") {
            val request = call.receiveText()
            val computationRequest = Gson().fromJson(request, ComputationRequest::class.java)
            controller.reset(computationRequest)
            call.respondText("Reset done!", ContentType.Text.Plain)
        }
    }
}

fun main() {
    println("Starting server at port 8080")
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

