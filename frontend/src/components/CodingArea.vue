<script setup>
import axios from 'axios'
</script>

<script>

export default {
    mounted(){
        let socket = io('http://server:3000')
        socket.emit('connect-client', localStorage.getItem('username'))
        socket.on('solve-response', (data) => {
            this.result += "\n" + data
        })
    },
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
            axios
                .post('http://server:3000/api/solveNext', {
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
            axios
                .post('http://server:3000/api/solveAll', {
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
            axios
                .post('http://server:3000/api/reset', {
                    request: {
                        username: localStorage.getItem('username'),
                        token: localStorage.getItem('token'),
                        id: localStorage.getItem('userid'),
                        theory: "",
                        query: "",
                        timeout: "",
                        maxSol: ""
                    }
                });
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
            <label for="timeout" id="timeoutLab">Timeout (ms): {{timeout}} </label>
            <input id="timeout" type="range" min="1" max="100" v-model="timeout">
        </div>
        <div>
            <label for="maxSol" id="maxSolLab">Max solutions: {{maxSol}} </label>
            <input id="maxSol" type="range" min="1" max="100" v-model="maxSol">
        </div>
    </div>
    
    <div class="buttons-container">
        <Button label="Solve Next" class="p-button-custom" @click="solveNext()" />
        <Button label="Solve All"  class="p-button-custom" @click="solveAll()" /> 
        <Button label="Reset" class="p-button-custom" @click="reset()" /> 
    </div>
</template>