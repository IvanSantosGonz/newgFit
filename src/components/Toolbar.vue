<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="toolbar">
            <v-card>
                <v-toolbar
                        color="blue"
                        dark
                        flat
                >
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>newgFit</v-toolbar-title>


                    <template v-slot:extension>
                        <v-tabs
                                v-model="tab"
                                align-with-title
                                background-color="transparent"
                        >
                            <v-tabs-slider color="yellow"></v-tabs-slider>

                            <v-tab v-for="item in items" :key="item">
                                {{ item }}
                            </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>

                <v-tabs-items v-model="tab">
                    <v-tab-item
                            v-for="item in items"
                            :key="item"
                    >
                        <v-card flat>
                            <v-card-text v-text="text"></v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
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
        }),
    };

</script>