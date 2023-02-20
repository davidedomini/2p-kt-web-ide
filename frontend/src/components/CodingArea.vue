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
        },
        solveAll() {
            console.log(this.query)
        },
        reset() {
            
        }
    }
}

</script>


<template>
    
    <div class='code-container'>
        <VueCodemirror v-model="code" />
        <textarea class="result" readonly> {{ result }} </textarea>
        <textarea class="query-area" v-model="query" placeholder="Insert the query here..." cols="91" />
    </div>
    
    
    
    <div>
        <Button label="Solve" class="p-button-custom" @click="solve()" />
        <Button label="Solve All"  class="p-button-custom" @click="solveAll()" /> 
        <Button label="Reset" class="p-button-custom" @click="reset()" /> 
    </div>

    
</template>


