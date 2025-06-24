<template>
  <span class="loader"></span>
</template>
<script setup>
</script>

<style scoped>
.loader {
    width: 15px;
    height: 15px;
    border: 3px solid #d4d4d4;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

</style>