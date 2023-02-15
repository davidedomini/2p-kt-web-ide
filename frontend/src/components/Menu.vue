<script setup>
</script>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label:'File',
                    icon:'pi pi-fw pi-file'
                }, 
                {
                    label:'Account',
                    icon:'pi pi-fw pi-user'
                },
                {
                    label:'Logout',
                    icon:'pi pi-fw pi-sign-out'
                }
            ]
        };
    }
}
</script>

<template>
    <Menubar :model="items" />
</template>

