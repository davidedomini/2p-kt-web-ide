<script setup>
import CodingArea from '../components/CodingArea.vue'
import Menu from '../components/Menu.vue'
</script>

<template>
    <main>
        <nav>
            <Menu />
        </nav>
        <CodingArea />
    </main>
</template>

<style>
nav{
    border-bottom: 100px !important; /*TODO non funziona*/
}
</style>