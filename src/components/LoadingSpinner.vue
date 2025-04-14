<template>
    <div class="d-flex justify-content-center align-items-center body">
        <div class="loader">

        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingSpinner"
}
</script>

<style scoped>
.body {
    min-height: 50vh;
}

.loader {
    border: 5px solid var(--rounded-two);
    border-radius: 50%;
    border-top: 5px solid #fff;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>