package it.unibo.request

import com.google.gson.Gson

class RequestParser {

    fun parseRequest(request: String): ComputationRequest {
        return Gson().fromJson(request, ComputationRequest::class.java)
    }

}