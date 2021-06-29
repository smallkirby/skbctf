<template>
  <footer>
    <div id="footer-status">
      <div id="left-status">
        <p>NORMAL</p>
      </div>
      <div id="branch">
        <p>master*</p>
      </div>
      <div id="rights">
        <p>smallkirby no rights received</p>
      </div>
      <div id="linenums">
        <p>0% 1/152 ln:1</p>
      </div>
      <div id="encoding">
        <p>utf-8[unix] LF</p>
      </div>
      <div />
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LayoutFooter',
  data() {
    return {}
  },
})
</script>

<style scoped>
div#footer-status {
  border-top: solid 0.1em;
  border-top-color: #42403f;
  text-align: center;
  position: fixed;
  width: 100%;
  background-color: #32302f;
  color: #ebdbb2;
  height: 1.3em;
  z-index: 40;
  bottom: 0;
}
div#left-status {
  width: 10%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
div#branch {
  width: 10%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
div#rights {
  width: 60%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-align: center;
}
div#linenums {
  width: 10%;
  float: right;
  display: inline;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
div#encoding {
  width: 10%;
  float: right;
  display: inline;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
@media only screen and (max-width: 699px) {
  footer {
    font-size: 0.7em;
  }
  div#left-status {
    display: none;
  }
  div#branch {
    display: none;
  }
  div#linenums {
    display: none;
  }
  div#rights {
    width: 80%;
  }
  div#encoding {
    display: none;
  }
}
</style>
