package it.unibo.controller

import it.unibo.model.ComputationsCollection
import it.unibo.request.ComputationRequest
import it.unibo.tuprolog.core.Struct
import it.unibo.tuprolog.core.parsing.TermParser
import it.unibo.tuprolog.solve.SolveOptions
import it.unibo.tuprolog.solve.Solver
import it.unibo.tuprolog.theory.parsing.ClausesParser
import it.unibo.tuprolog.solve.classic.ClassicSolverFactory

class Controller{

    private val computations = ComputationsCollection()

    fun solveAll(request: ComputationRequest):String {
        log("Entering solveAll")
        val p = getSolverAndGoal(request)
        val solutions =
            p.first
                .solve(p.second, SolveOptions.someEagerlyWithTimeout(request.maxSol, request.timeout))
                .take(request.maxSol)
                .map { it.substitution }
                .map { it.toString()}
                .reduce { acc, string -> acc + string }
        log("Solutions: $solutions")
        return solutions
    }

    fun solveNext(request: ComputationRequest): String{
        log("Entering solveNext")
        if(!computations.isPresent(request.id)) {
            log("Computation not already present")
            val p = getSolverAndGoal(request)
            val iterator =
                p.first
                    .solve(p.second, SolveOptions.someEagerlyWithTimeout(request.maxSol, request.timeout))
                    .take(request.maxSol)
                    .iterator()
            computations.addComputation(request.id, iterator)
        }
        log("Finding next solution")
        val solution = computations
            .nextSolution(request.id)
        log("Solution: $solution")
        return when(solution){
            null -> {
                log("No more solutions...remvoing computation")
                computations.removeComputation(request.id)
                "No more solutions!"
            }
            else -> solution.substitution.toString()
        }
    }

    fun reset(request: ComputationRequest) {
        computations.removeComputation(request.id)
    }

    private fun getSolverAndGoal(request: ComputationRequest): Pair<Solver, Struct> {
        val theory = with(ClausesParser.withDefaultOperators()){
            parseTheory(request.theory)
        }
        val goal = with(TermParser.withDefaultOperators()){
            parseStruct(request.goal)
        }
        val solver = ClassicSolverFactory.solverOf(staticKb = theory)
        return Pair(solver, goal)
    }

    private fun log(message: String) {
        println("[Controller] $message")
    }

}