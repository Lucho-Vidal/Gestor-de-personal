<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div
            class="container-fluid container d-flex flex-wrap justify-content-between"
        >
            <a class="navbar-brand" href="#">PCT - Gestión de Personal</a>
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
                            <a class="nav-link" href="/buscador">Buscador</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./pages/planillon.html"
                                >Planillón diario</a
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./pages/ciclo.html"
                                >Ciclo</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
