<script setup>
</script>

<script>

export default {
    data() {
        return {
            code: ""
        };
    },
    methods: {
        printCode() {
            console.log(this.code)
        }
    }
}

</script>


<template>
    
    <VueCodemirror
        :style="{ height: '500px', width:'750px' }"
        v-model="code"
    />

    <Button label="Solve" style="height: 35px; width: 100px;" class="p-button-custom" @click="printCode()" />
    <Button label="Solve All" style="height: 35px; width: 100px;" class="p-button-raised p-button-custom" @click="printCode()" /> 
    <Button label="Reset" style="height: 35px; width: 100px;" class="p-button-raised p-button-custom" @click="printCode()" /> 
</template>


<style scoped>
.p-button-custom {
    margin-top:10px;
    margin-left:10px;
    border-radius: 50px;
}
</style>