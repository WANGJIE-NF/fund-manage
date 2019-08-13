<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
    name: 'app',

    methods: {
                           
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      },
    },

    created(){
      // 获取token
      if(!localStorage.eleToken) return;
      const decoded = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
    
}
</script>


<style>
blockquote, body, button, dd, dl, dt, fieldset, form, 
h1, h2, h3, h4, h5, h6, hr, input, legend, ul, li, ol, p, pre, td, textarea, th{
  margin: 0;
  padding: 0;
}
body{
  font-family: Tahoma,Arial,"宋体";
  font-size: 14px;
  line-height: 1.5;
  color: #424242;
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}

html,
body,
#app{
  width: 100%;
}
</style>
