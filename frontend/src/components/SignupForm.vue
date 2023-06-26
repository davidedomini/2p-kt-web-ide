<script setup>
import router from "@/router";
import axios from 'axios'
</script>

<script>
export default {
    data() {
        return {
            messages: [],
            form: {
                name: '',
                surname: '',
                email: '',
                username: '',
                password: ''
            }
        }
    },
    methods:{
        registerStudent(){
            axios
                .post('http://localhost:3000/api/signup', {
                    user: {
                        name: this.form.name,
                        surname: this.form.surname,
                        email: this.form.email,
                        username: this.form.username,
                        password: this.form.password,
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.result === 'error'){
                        this.messages.push({severity: 'error', content: res.data.message})
                    }else{
                        router.push({path: '/'})
                    }
                });
        }
    }
}
</script>


<template>
    <div class="container">
        <form class="signup-form" @submit.prevent="registerStudent">
            <h1>Signup</h1>
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" v-model="form.name" />
            </div>
            <div class="p-field">
                <label for="surname">Surname</label>
                <InputText id="surname" v-model="form.surname" />
            </div>
            <div class="p-field">
                <label for="email">Email</label>
                <InputText id="email" v-model="form.email" />
            </div>
            <div class="p-field">
                <label for="username">Username</label>
                <InputText id="username" v-model="form.username" />
            </div>
            <div class="p-field">
                <label for="password">Password</label>
                <InputText type="password" id="password" v-model="form.password" />
            </div>
            <div class="p-field">
                <Button type="submit" label="Signup" />
            </div>
            <div>
                <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>
            </div>
        </form>
    </div>  
</template>
  
<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.signup-form {
width: 40%;
margin: 0;
padding: 20px;
border: 1px solid #ddd;
border-radius: 4px;
background-color: #f5f5f5;
}

h1 {
text-align: center;
margin-bottom: 20px;
}

.p-field {
margin-bottom: 20px;
}

label {
display: block;
font-weight: bold;
margin-bottom: 5px;
}

.p-inputtext {
width: 100%;
border-radius: 4px;
border: 1px solid #ccc;
padding: 10px;
}

.p-button {
width: 100%;
background-color: #2196f3;
color: #fff;
border: none;
border-radius: 4px;
padding: 10px;
font-size: 16px;
cursor: pointer;
transition: all 0.3s ease-in-out;
}

.p-button:hover {
background-color: #0d8ddb;
}

@media (max-width: 550px) {
.signup-form {
    width: 80%;
}
}
@media (min-width: 551px) and (max-width: 1000px){
.signup-form {
    width: 60%;
}  
}

</style>
  