<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="toolbar">
        <v-app-bar>

            <v-toolbar-title>newgFit</v-toolbar-title>

            <v-spacer></v-spacer>

            <template>
                <v-toolbar-items>
                    <v-btn text to="/home">Home</v-btn>
                    <v-btn text to="/about">About</v-btn>

                    <v-avatar id="avatar"
                              size="52px"
                              :color="color"
                              :tile="tile"
                    >
                        <img
                                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                alt="Avatar"
                        >
                    </v-avatar>
                </v-toolbar-items>
            </template>
        </v-app-bar>

    </div>
</template>


<script>
    export default {

        data: () => ({
            tab: null,
            items: [
                'Home', 'About', 'videos', 'images', 'news',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            tile: false,
            color: 'grey lighten-4',
            img: true
        }),
    };

</script>


<style>
    #avatar {
        align-self: center;
        margin-left: 15px;
        margin-right: 0px;
    }
</style>