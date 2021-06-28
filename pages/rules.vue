<template>
  <layout-wrapper>
    <div class="mr-10">
      <div class="m-6 my-8">
        <p class="text-pink-200 text-3xl my-2">Rules</p>
        <div class="mx-4">
          <p>
            The principle is that
            <b>you must not attack anything other than the challenge itself.</b>
          </p>
          <p>
            If you break the rules, your IP would be banned and you can't join
            eternally.
          </p>
          <p>And above all, I will cry like a child.</p>
        </div>
      </div>
      <div class="ml-2">
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">DON'TS</p>
          <div class="mx-4">
            <ul class="list-inside list-decimal">
              <li class="w-auto">
                You must not attack this scoreboard server, database API, and
                other all servers other than challenge server for any reasons,
                in any ways.
              </li>
              <li class="w-auto">
                You must not try DoS on challenges. They all are designed to be
                solvable with reasonable tries.
              </li>
              <li class="w-auto">
                You must not share flags publicly for any reason. (For
                solutions, follow below rules.)
              </li>
              <li class="w-auto">
                You must not jailbreak from docker or QEMU in a challenge
                server.
              </li>
            </ul>
          </div>
        </div>
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">Writeups</p>
          <div class="mx-4">
            <ul class="list-inside list-decimal">
              <li class="w-auto">
                You can't share flags directly in public for any reason.
              </li>
              <li class="w-auto">
                You can share solutions/writeups publicly
                <b>after three months</b> the challenge is released.
              </li>
              <li class="w-auto">
                You can share solutions anytime inside closed community. (such
                as closed Slack)
              </li>
            </ul>
          </div>
        </div>
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">Challenges</p>
          <div class="mx-4">
            <ul class="list-inside list-decimal">
              <li class="w-auto">
                Flag format is <code>skbctf\{[a-zA-Z0-9_!\?\-]+\}</code>.
              </li>
              <li class="w-auto">
                Most challenges are running on QEMU on docker. You don't have to
                know the environment to pwn it.
              </li>
            </ul>
          </div>
        </div>
        <div class="m-6 my-8">
          <p class="text-white text-2xl my-2">Report to us</p>
          <div class="mx-4">
            <div class="mb-2">
              <p>
                If you find below things, please report to us. We would grateful
                to you by putting your credit on this site.
              </p>
              <p>Do not exploit them without reporting.</p>
            </div>
            <ul class="list-inside list-decimal">
              <li class="w-auto">
                When you find vulnerabilities in a scoreserver or any other
                servers/APIs.
              </li>
              <li class="w-auto">
                When you find vulnerabilities in a challenge server, which is
                not related to the challenge itself.
              </li>
              <li class="w-auto">
                When you find unintended solutions in challenges.
              </li>
              <li class="w-auto">
                When you find something which can be improved, such as a design
                of challenges and a scoreboard.
              </li>
            </ul>
            <div class="mt-2">
              <p>
                Feel free to contact us:
                <a href="https://twitter.com/smallkirby_">@smallkirby_</a>
              </p>
            </div>
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
