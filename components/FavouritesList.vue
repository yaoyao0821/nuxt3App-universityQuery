<script setup>

const fav = useFav()

const columns = tableColumns

const page = ref(1)
const pageCount = 10

const rows = computed(() => {
  return fav.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

</script>

<template>
  <span>
    <slot />
    test
    <div>
      <UTable :columns="columns" :rows="rows">
        <template #actions-data="{ row }">
          <div>
            <UButton label="Delete" color="black"
                        variant="solid"
                        @click="deleteInFav(row)"/>
          </div>
          
        </template>
      </UTable>
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="fav?.length" />
      </div>
    </div>
  </span>
</template>
