<template>
    <v-app>

        <div>
            <my-toolbar></my-toolbar>


            <v-content>
                <p>
                    <router-link to="/home">Home</router-link>
                </p>
                <p>
                    <router-link to="/about">About</router-link>
                </p>
                <router-view></router-view>
            </v-content>
        </div>
    </v-app>

</template>


<script>
    import Toolbar from './components/Toolbar.vue';

    export default {
        name: 'app',
        components: {
            "my-toolbar" : Toolbar
        }
    }
</script>