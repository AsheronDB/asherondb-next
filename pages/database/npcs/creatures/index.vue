<template>
  <div>
    <PageBreadcrumb />
    <PageHeader />

    
    <div>  

      <UTable :columns :rows="creatures">
        <template #name-data="{ row }">
          <nuxt-link :to="'/database/npcs/creatures/' + row.wcid">
            <p class="font-bold">{{ row.name }}</p>
          </nuxt-link>
        </template>
      </UTable>
    
      <div class="bg-gray-800/50 p-4">
        <UPagination v-model="page" :page-count="perPage" :total="totalPages" />
      </div>
      

    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
console.log(route);

const totalPages = ref(10);
const page = ref(1);
const perPage = ref(10);


const countSql = computed(
  () =>
    `SELECT COUNT(class_Id) as total FROM weenie where type = 10`
);

const { data: count } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "creatures-total",
    query: {
      sql: countSql,
    },
  }
);

totalPages.value = Number(count.value[0].total, 10)


const sql = computed(
  () =>
    `SELECT w.class_Id as wcid, w_string_name.value as name FROM weenie as w LEFT JOIN weenie_properties_string AS w_string_name ON w.class_Id = w_string_name.object_Id AND w_string_name.type = 1 where w.type = 10 LIMIT ${perPage.value} OFFSET ${(Number(page.value) - 1) * perPage.value
    }`
);

const { data: creatures, error } = await useFetch(
  `https://acedb.treestats.net/ace_world_patches.json?_shape=array`,
  {
    key: "creatures",
    query: {
      sql,
    },
  }
);


// const columns = computed(() =>
//   creatures.value.columns.map((column) => ({
//     key: column,
//     label: column,
//   }))
// );

const columns = [
  {
    key: "wcid",
    label: "WCID",
    class: "w-[0.1%] text-center",
  },
  {
    key: "name",
    label: "Name",
  },
];

// const rows = computed(() => {
//   // Object.fromEntries(
//   //   creatures.value.columns.map((key, index) => [
//   //     key,
//   //     creatures.value.rows[index],
//   //   ])
//   // );

//   return creatures.value.rows.map((row) => {
//     const obj = Object.fromEntries(
//       creatures.value.columns.map((key, index) => [key, row[index]])
//     );

//     // const obj = {
//     //   name: "Name",
//     //   id: "id",
//     // };
//     return obj;
//   });
// });

// [
//   {
//     key: "icon",
//     label: "",
//     class: "w-[0.1%] text-center",
//   },
//   {
//     key: "name",
//     label: "Name",
//   },
// ];

const rows = [
  {
    id: "1234",
    name: "Cow",
  },
];

definePageMeta({
  title: "Creatures",
});
</script>
