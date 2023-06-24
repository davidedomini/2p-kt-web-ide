<script setup>
import router from "@/router";
</script>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label:'Logout',
                    icon:'pi pi-fw pi-sign-out',
                    command: () => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('id');
                        router.push({path: '/'});
                    }
                }
            ]
        };
    }
}
</script>

<template>
    <Menubar :model="items" />
</template>

