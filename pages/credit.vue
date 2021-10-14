<template>
  <layout-wrapper>
    <div class="md:mr-10">
      <div class="mx-5 md:m-6 my-2">
        <p class="text-pink-200 text-3xl my-2">Credits</p>
      </div>
      <div class="ml-2">
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">Authors</p>
          <div class="mx-4">
            <ul class="list-inside list-disc">
              <li class="w-auto">
                <a href="https://twitter.com/smallkirby">@smallkirby</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">Materials</p>
          <div class="mx-4">
            <ul class="list-inside list-disc">
              <li class="w-auto">
                SVG of twitter icon
                <img src="~/static/img/twitter.svg" class="inline w-4" />
                :
                <a
                  href="https://www.flaticon.com/authors/pixel-perfect"
                  title="Pixel perfect"
                  >Pixel perfect</a
                >
                from
                <a href="https://www.flaticon.com/" title="Flaticon"
                  >www.flaticon.com</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">Contributors</p>
          <div class="mx-4">
            <ul class="list-inside list-disc">
              <li class="w-auto">nirugiri: a dog in my head</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
