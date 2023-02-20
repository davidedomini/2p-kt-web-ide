<script setup>
</script>

<script>

export default {
    data() {
        return {
            code: "",
            result:"Query result:",
            query:""
        };
    },
    methods: {
        solve() {
            console.log(this.code)
            this.result += "\n Solve Pressed"
        },
        solveAll() {
            console.log(this.query)
            this.result += "\n SolveAll Pressed"
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
    
    <div class="buttons-container">
        <Button label="Solve" class="p-button-custom" @click="solve()" />
        <Button label="Solve All"  class="p-button-custom" @click="solveAll()" /> 
        <Button label="Reset" class="p-button-custom" @click="reset()" /> 
    </div>
</template>


