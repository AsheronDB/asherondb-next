<template>
  <PageArticle>
    <template #sidebar>
      <div class="">
        <PageToC :key="route.fullPath" :target="mainContentRef" />
      </div>
    </template>
    <template #linkbar>
      <div class="py-8">
        <p class="font-bold">Quick Links</p>
        <ul>
          <li>
            Asheron's Call Installer
          </li>
        </ul>
      </div>
    </template>
    <template #default>
      <div class="py-8">




        <div class="space-y-12" ref="mainContentRef">


          <ul
            class="flex flex-wrap font-bold text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 text-lg">
            <li class="me-2">
              <nuxt-link to="/guides/how-to-play"
                class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Windows</nuxt-link>
            </li>
            <li class="me-2">
              <nuxt-link to="/guides/how-to-play/macos"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">macOS</nuxt-link>
            </li>
            <li class="me-2">
              <nuxt-link to="/guides/how-to-play/linux"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Linux</nuxt-link>
            </li>
          </ul>

          <NuxtPage />
          <hr />
          <section class="space-y-6">
            <h3 id="decal" class="text-3xl font-bold text-gray-900 tracking-tight leading-none">
              <span class="text-gray-400 dark:text-gray-500">Optional:</span>
              Download and install Decal
            </h3>

            <UButton to="https://decaldev.com/releases/2983/Decal.msi" class="font-bold" size="xl"
              icon="i-heroicons-arrow-down-tray">Decal v2.9.8.3</UButton>

            <h4 id="decal-install">Installation</h4>

            <ul class="list-decimal list-inside text-lg">
              <li>Right click the installer and run as admin.</li>
              <li><strong>Do not change the default install path!</strong></li>
              <li>
                If you receive this
                <a
                  href="https://images-ext-2.discordapp.net/external/cO7WaIu-p1t2vzxGHCZOtr6X2IJ4rveqc0kzMVOIu0A/https/media.discordapp.net/attachments/380130471750795265/409583758748942337/unknown.png">error
                  message</a>, run the&nbsp;<a
                  href="https://download.microsoft.com/download/1/7/1/1718CCC4-6315-4D8E-9543-8E28A4E18C4C/dxwebsetup.exe">DirectX
                  installer</a>, then try again.
              </li>
              <li>
                Start Decal, and close the pop up that says the client is out of
                date.
              </li>
              <li>Click update in Decal.</li>
              <li>
                A red X for the filter "Version 1 plugin surrogate" is normal.
              </li>
              <li>
                If you have all red Xs, go back to step 1 and replace
                acclient.exe from the zip file.
              </li>
            </ul>

            <h4 id="decal-thwargfilter">ThwargFilter</h4>

            <ul class="list-decimal list-inside text-lg">
              <li>
                Click add &gt; browse &gt; Program Files (x86) &gt; Thwargle
                Games
              </li>
              <li>
                Select <strong>ThwargFilter.dll</strong> and save, as shown
                below.
              </li>
              <li>
                Enable <strong>Decal injection</strong> in the bottom right
                corner of ThwargLauncher.
              </li>
              <li>
                Log in and stay in game for at least 30 seconds before
                installing any plugins.
              </li>
              <li>
                AC will close with no error message if ThwargFilter.dll has not
                been added properly.
              </li>
            </ul>

            <media-gallery :images="[
          'https://emulator.ac/wp-content/uploads/2019/11/decal-thwargfilter.png',
          'https://emulator.ac/wp-content/uploads/2019/11/decal-thwargfilter2.png',
          'https://emulator.ac/wp-content/uploads/2019/11/decal-thwargfilter3.png',
        ]" />

            <h4 id="decal-plugins">Recommended Plugins</h4>
          </section>
          <hr />

          <section class="space-y-6">
            <h3 id="4k-monitor" class="text-3xl font-bold text-gray-900 tracking-tight leading-none">
              <span class="text-gray-400 dark:text-gray-500">Optional:</span>
              4K Monitor Setup
            </h3>

            <p>
              Go to Properties on aclient.exe, Compatibility, Change high DPI
              settings. Check Program DPI. Login game and change resolution to
              2560x1440.
            </p>

            <p>
              *Decal installation required *Mag-Tools required *Mag-Filter
              required
            </p>
          </section>
          <hr />

          <section class="space-y-6">
            <h3 id="servers" class="">Finding a Server</h3>

            <p>
              To begin playing, you'll want to choose a server with a good
              player population, however not all servers provide the same
              experience. There are many servers attempting recreate content
              that matches "End-of-Retail" (or EoR) as closely as possible,
              while others add custom content or mechanics.
            </p>

            <p>
              The two main emulators are AC Emulator and GDLEnhanced. While both
              aim to recreate the experience of retail Asheron's Call as of the
              final May 2015 patch, they differ in what content is currently
              available. You'll want to pay attention to which emulator your
              chosen server is running, as they have different communities, bug
              reporting mechanisms, and other differences.
            </p>

            <div class="grid gap-8 grid-cols-2">
              <div class="space-y-6">
                <h4 id="ace">AC Emulator</h4>
                <!-- 
      <UAlert
        icon="i-heroicons-exclamation-circle"
        color="primary"
        variant="subtle"
        title="Accounts for most ACE servers are created on first login." /> -->

                <UTable :rows="people" :ui="{
          divide: 'dark:divide-primary-900',
          tbody: 'dark:divide-primary-950',
          td: {
            color: 'dark:text-primary',
          },
        }">
                  <template #discord-data="{ row }">
                    <UButton icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </template>
                </UTable>
              </div>
              <div class="space-y-6">
                <h4 id="gdle">GDLEnhanced</h4>
                <UTable :rows="people" :ui="{
          divide: 'dark:divide-primary-900',
          tbody: 'dark:divide-primary-950',
          td: {
            color: 'dark:text-primary',
          },
        }">
                  <template #discord-data="{ row }">
                    <UButton icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </template>
                </UTable>
              </div>
            </div>
          </section>

          <hr />

          <section class="space-y-6">
            <h3 id="issues" class="text-3xl font-bold text-gray-900 tracking-tight leading-none mb-3">
              Common Issues
            </h3>

            <UAccordion :items="issues" multiple :ui="{ wrapper: 'flex flex-col w-full' }">
              <template #default="{ item, index, open }">
                <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700"
                  :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                  <span class="truncate">{{ item.label }}</span>

                  <template #trailing>
                    <UIcon name="i-heroicons-chevron-right-20-solid"
                      class="w-5 h-5 ms-auto transform transition-transform duration-200"
                      :class="[open && 'rotate-90']" />
                  </template>
                </UButton>
              </template>
            </UAccordion>
          </section>
        </div>






      </div>
    </template>
  </PageArticle>
</template>

<script setup lang="ts">
const mainContentRef = ref(null);

const route = useRoute();

definePageMeta({
  layout: "three-column",
  title: 'How to Play'
})

</script>