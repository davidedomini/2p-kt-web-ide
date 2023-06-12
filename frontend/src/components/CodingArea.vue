<script setup>
</script>

<script>

export default {
    data() {
        return {
            code: "",
            result:"Query result:",
            query:"",
            timeout: 50,
            maxSol: 10,
        };
    },
    methods: {
        solveNext() {
            console.log(this.code)
            this.result += "\n Solve Pressed"
            axios
                .post('http://localhost:3000/api/solveNext', {
                    request: {
                        username: localStorage.getItem('username'),
                        token: localStorage.getItem('token'),
                        id: localStorage.getItem('userid'),
                        theory: this.code,
                        query: this.query,
                        timeout: this.timeout,
                        maxSol: this.maxSol
                    }
                });
        },
        solveAll() {
            console.log(this.query)
            this.result += "\n SolveAll Pressed"
            axios
                .post('http://localhost:3000/api/solveAll', {
                    request: {
                        username: localStorage.getItem('username'),
                        token: localStorage.getItem('token'),
                        id: localStorage.getItem('userid'),
                        theory: this.code,
                        query: this.query,
                        timeout: this.timeout,
                        maxSol: this.maxSol
                    }
                });
        },
        reset() {
            this.result = "Query result:"
        }
    }
}
</script>

<template>
    <div class='code-container'>
        <VueCodemirror v-model="code" />
        <textarea class="result" rows="7" readonly> {{ result }} </textarea>
        <textarea class="query-area" rows="3" v-model="query" placeholder="Insert the query here..." />
    </div>

    <div class="slider-container">
        <div>
            <label for="timeout" id="timeout">Timeout (ms): {{timeout}} </label>
            <input id="timeout" type="range" min="1" max="100" v-model="timeout">
        </div>
        <div>
            <label for="maxSol" id="timeout">Max solutions: {{maxSol}} </label>
            <input id="maxSol" type="range" min="1" max="100" v-model="maxSol">
        </div>
    </div>
    
    <div class="buttons-container">
        <Button label="Solve Next" class="p-button-custom" @click="solveNext()" />
        <Button label="Solve All"  class="p-button-custom" @click="solveAll()" /> 
        <Button label="Reset" class="p-button-custom" @click="reset()" /> 
    </div>
</template>