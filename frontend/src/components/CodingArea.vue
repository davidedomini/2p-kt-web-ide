<script setup></script>

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
    <div> ei qui puoi programmare in prolog </div>
    <VueCodemirror
    :style="{ height: '50vh', width:'50vh' }"
    v-model="code"
    />

    <Button @click="printCode()"> Solve </Button>
</template>


