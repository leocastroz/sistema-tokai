<template>
    <div class="animate__animated animate__fadeInLeft">
        <h1>Opps..!</h1>
        <p>
            Parece que você tentou acessar <span>secret</span> sem ter um login.
            Por favor, faça o cadastro para acessar à página.
        </p>
        <br>
        <div>
            <p class="questions">Porque está me pedindo isso ?</p>
            <p>
                está aplicação és um desenvolvimento e apresentação
                de um portófolio desenvolvido por mim. Para fins de
                apresentação pessoal e profissional.
            </p>
        </div>
        <br>
        <div>
            <p class="questions">Como posso testar a aplicação ?</p>
            <p>
                você poderá criar um email simples ou utilizar um
                próprio, e fazer o cadastro. Após isso, você poderá
                acessar a página <span>secret</span>. Não se preocupe,
                não será vazado nenhum dado.
            </p>
        </div>
        <br>
        <div>
            <p>Já possuo uma conta, vamos de <RouterLink to="/login">login</RouterLink>.</p>
            <p>
                <RouterLink to="/cadastro">cadastrar-se</RouterLink>, pois não possuo uma conta.
            </p>
        </div>
        <p class="footer">© 2023 Todos os direitos reservados.</p>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.footer {
    margin-top: 30px;
    font-size: 11px;
    color: #52535A;
}

h1,
p {
    color: #6D6D70;
}

p {
    max-width: 400px;
    line-height: 30px;
}

a {
    color: #1e90ff;
    text-decoration: underline;
}

.questions {
    color: #1e90ff;
}

span {
    font-size: 13px;
    padding: 3px 15px;
    border-radius: 20px;
    border: 1.5px dashed #1e90ff;
    color: #1e90ff;
    background-color: #223d58;
    margin: 0 2px;
}
</style>