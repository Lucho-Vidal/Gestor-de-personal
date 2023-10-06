<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div
            class="container-fluid container d-flex flex-wrap justify-content-between"
        >
            <a class="navbar-brand" href="#">PCT - Gestión de Novedades del Personal de Abordo</a>
            <div>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/"
                                >Home</a
                            >
                        </li>
                        <li class="nav-item">
                            <!-- <a class="nav-link" href="/buscador">Buscador</a> -->
                            <router-link class="nav-link" to="/buscador">Buscador</router-link>
                        </li>
                        <li class="nav-item">
                            <!-- <a class="nav-link" href="/personal">Personal</a> -->
                            <router-link class="nav-link" to="/personal">Personal</router-link>
                        </li>
                        <li class="nav-item">
                           <!--  <a href="/novedades" class="nav-link">Novedades</a> -->
                            <router-link class="nav-link" to="/novedades">Novedades</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="#">Planillón diario</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Ciclo</a>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<style>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #333;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
}
</style>
