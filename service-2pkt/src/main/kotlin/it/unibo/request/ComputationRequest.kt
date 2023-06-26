package it.unibo.request

class ComputationRequest(
    val id: String,
    val theory: String,
    val goal: String,
    val timeout: Long = -1,
    val maxSol: Int = -1
)