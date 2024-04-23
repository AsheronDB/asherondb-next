<template>
  <div>
    <div class="space-y-12">
      <section class="space-y-6">
        <h3
          id="step-1"
          ref="heading"
          class="scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]"
        >
          <a
            aria-current="page"
            href="/how-to-play#step1"
            class="group"
          ><div
            class="-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute"
          >
            <span
              class="i-heroicons-hashtag-20-solid w-4 h-4 text-primary"
            />
          </div>
            Step 1:
            <span class="text-black dark:text-white">Asheron's Call Installer</span></a>
        </h3>

        <ol class="ml-4 list-disc marker:text-lg space-y-6">
          <li class="space-y-4">
            <p class="text-lg">
              Download the official Asheron's Call installer from Turbine.
            </p>

            <div class="space-y-2">
              <p>
                <UButton
                  to="http://content.turbine.com/sites/clientdl/ac1/ac1install.exe"
                  class="font-bold"
                  size="xl"
                  color="acred"
                  icon="i-heroicons-arrow-down-tray"
                >
                  ac1install.exe
                </UButton>
              </p>

              <p class="text-sm">
                * Requires Windows 7 and up
              </p>
            </div>
          </li>

          <li>
            <p class="mb-4 text-lg">
              Run <strong>ac1install.exe</strong> and install to the default
              location: C:\Turbine\Asheron's Call
            </p>

            <media-gallery
              :images="[
                'https://emulator.ac/wp-content/uploads/2019/11/acinstall.png',
              ]"
            />
          </li>
        </ol>
      </section>
      <hr>
      <section class="space-y-6">
        <h3
          id="step-2"
          ref="heading"
          class="text-3xl font-bold text-gray-900 tracking-tight leading-none mb-3"
        >
          <span class="text-primary">Step 2:</span> Update to May 2015 client
          files
        </h3>

        <ol class="ml-4 list-disc marker:text-lg space-y-6">
          <li class="space-y-4">
            <p class="text-lg">
              Since the official Asheron's Call installer does not update the
              game to the final May 2015 patch data, you'll need to download
              it here:
            </p>

            <UButton
              to=" https://mega.nz/#!Q98n0BiR!p5IugPS8ZkQ7uX2A_LdN3Un2_wMX4gZBHowgs1Qomng"
              class="font-bold"
              target="_blank"
              size="xl"
              icon="i-heroicons-arrow-down-tray"
            >
              May 2015 Client Files
            </UButton>

            <media-gallery
              :images="[
                'https://emulator.ac/wp-content/uploads/2020/03/Capture.png',
              ]"
            />
          </li>

          <li class="space-y-4">
            <p class="text-lg">
              Extract the files from <strong>ac-updates.zip</strong> and copy
              them into your AC installation directory.
            </p>

            <media-gallery
              :images="[
                'https://emulator.ac/wp-content/uploads/2020/03/copy-files-1.png',
              ]"
            />
          </li>
        </ol>
      </section>

      <hr>

      <section class="space-y-6">
        <h3 id="step-3">
          <span class="text-primary">Step 3:</span> Install Required System
          Files
        </h3>

        Step 3-Required Files DirectX 9.0 Visual C++ 2005 Service Pack 1 .NET
        Framework Packages: Windows 10 and 11: Press Windows Key and search for
        "Turn Windows Features on or off (Control Panel)" Toggle .NET Framework
        3.5 and 4.x on Windows 8.1 and older: .NET Framework 4.0 .NET Framework
        3.0
      </section>
      <hr>

      <section class="space-y-6">
        <h3 id="step-4">
          <span class="text-primary">Step 4:</span> Install a new game launcher
        </h3>

        <p>
          The retail AC game launcher (launcher.exe) will not work with emulators.
          Instead, you will need to download a third party launcher to play
          Asheron's Call on private emulator servers.
        </p>

        <h4 id="step-4-launcher">
          ThwargLauncher
        </h4>

        <p>
          The most widely-used third party launcher is
          <strong>ThwargLauncher</strong>
        </p>

        <UButton
          to="http://www.thwargle.com/thwarglauncher/updates/ThwargLauncherInstaller.exe"
          class="font-bold"
          size="xl"
          icon="i-heroicons-arrow-down-tray"
        >
          ThwargLauncher.exe
        </UButton>

        <p>Be sure to install Thwarglauncher to its default path.</p>

        <media-gallery
          :images="[
            'https://emulator.ac/wp-content/uploads/2019/11/thwarglauncher-default-path.png',
          ]"
        />

        <p>
          To use ThwargLauncher in <strong>Advanced Mode</strong>, you will need
          to install Decal and follow the ThwargFilter instructions in the next
          step.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
const _props = defineProps(["modelValue"])
const emits = defineEmits(["update:modelValue"])

const heading = ref([])

onMounted(async () => {
  await nextTick()
  emits("update:modelValue", heading.value)
})

// definePageMeta({
//   title: 'Windows'
// })
</script>
