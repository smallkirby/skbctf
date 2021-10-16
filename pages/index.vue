<template>
  <layout-wrapper>
    <div class="md:mr-10">
      <div class="mx-5 md:m-6 my-2">
        <div class="flex items-center">
          <p class="text-pink-200 text-3xl my-2 mr-2">Welcome to skbctf for TSGer</p>
          <img src="~/static/img/logo.png" class="w-10 h-10" />
        </div>
        <div class="mx-4">
          <p><b>skbctf</b> is a CTF platform held all the year.</p>
          <p>This site has several challenges mainly from pwn genre.</p>
          <p>
            You can pwn these challs and submit flags, to obtain scores and to
            be honored in the scoreboard.
          </p>
          <p>
            This version of skbctf is only for TSGer, though anyone can play with. Challenges are frequently updated now.
          </p>
        </div>
      </div>
      <div class="m-6 my-8">
        <p class="text-white text-2xl my-2">How to play here</p>
        <div class="mx-4">
          <p>
            You can check and download all the challs without any regisrations.
          </p>
          <p>
            You have to, however, signin/signup with Twitter to submit flags and
            to get on the leadersboard.
          </p>
        </div>
      </div>
      <div class="m-6 my-8">
        <p class="text-white text-2xl my-2">Rules</p>
        <div class="mx-4">
          <p>
            The principle is that
            <b>you must not attack anything other than the challenge itself.</b>
          </p>
          <p>
            Especially, you mustn't attack this score server. If you find
            something vulnerable in this score server, or unintended flaw in
            challenges, please contact us.
          </p>
          <p>We would be grateful to you by showing your credit.</p>
          <p>
            Check <NuxtLink to="/rules" class="underline">'Rules'</NuxtLink> for more
            detail.
          </p>
        </div>
      </div>
      <div class="m-6 my-8">
        <p class="text-white text-2xl my-2">Contact us</p>
        <div class="mx-4">
          <p>
            Feel free to contact us:
            <a href="https://twitter.com/smallkirby">@smallkirby</a>
          </p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  created() {},
})
</script>
