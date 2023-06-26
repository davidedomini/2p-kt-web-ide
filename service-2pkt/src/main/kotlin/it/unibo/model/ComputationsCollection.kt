package it.unibo.model

import it.unibo.tuprolog.solve.Solution

class ComputationsCollection {

    private var computations: Map<String, Iterator<Solution>> = emptyMap()

    fun addComputation(id: String, c: Iterator<Solution>) {
        computations = computations + mapOf(id to c)
        log("Added computation: ${computations.toString()}")
    }

    fun removeComputation(id: String) {
        computations = computations.filterNot { it.key.contains(id, ignoreCase = true) }
        log("Removed computation: ${computations.toString()}")
    }

    fun nextSolution(id: String): Solution? {
        return if (computations[id]!!.hasNext()){
            computations[id]!!.next()
        }else{
            null
        }
    }

    fun isPresent(id: String): Boolean {
        return computations.containsKey(id)
    }

    private fun log(message: String) {
        println("[ComputationCollection] $message")
    }

}