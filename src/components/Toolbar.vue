<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="toolbar">
        <v-app-bar>

            <v-toolbar-title>newgFit</v-toolbar-title>

            <v-spacer></v-spacer>

            <template>
                <v-toolbar-items>
                    <v-btn text to="/home">Home</v-btn>
                    <v-btn text to="/about">About</v-btn>
                    <v-btn text v-on:click="googleLogin">{{signInText}}</v-btn>
                    <v-btn text v-if="signedIn">{{user.displayName}}</v-btn>

                    <v-avatar v-if="signedIn" id="avatar"
                              size="52px"
                              :color="color"
                              :tile="tile"
                    >
                        <img
                                v-bind:src="user.photoURL"
                                alt="Avatar"
                        >
                    </v-avatar>
                </v-toolbar-items>
            </template>
        </v-app-bar>

    </div>
</template>


<script>
    import firebase from 'firebase'

    export default {

        data: () => ({
            signedIn: false,
            signInText: "SignIn",
            user: "null",
            tile: false,
            color: 'grey lighten-4',
        }),
        created() {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        },
        methods: {
            googleLogin() {
                const provider = new firebase.auth.GoogleAuthProvider()
                if (!this.signedIn) {
                    firebase
                        .auth()
                        .signInWithPopup(provider)
                        .then(result => {
                            console.log('result -> ' + result.toString())
                            this.$router.replace('about')
                            this.signInText = "SignOut"
                            this.signedIn = true
                            this.user = firebase.auth().currentUser
                        })
                        .catch(err => {
                            alert('Oops. ' + err.message)
                        })
                }
                else {
                    firebase.auth().signOut()
                        .then(result => {
                                console.log("signingOut => " + result)
                                this.signInText = "SignIn"
                                this.signedIn = false
                                this.user = firebase.auth().currentUser
                            }
                        )
                }
            },
        }
    };

</script>


<style>
    #avatar {
        align-self: center;
        margin-left: 15px;
        margin-right: 0px;
    }
</style>