<script setup>

const fav = useFav()

const columns = [{
  key: 'actions'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'state-province',
  label: 'State/province',
  sortable: true
}, {
  key: 'web_pages',
  label: 'Website'
}]

const page = ref(1)
const pageCount = 10

const rows = computed(() => {
  return fav.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

function deleteInFav(row) {
  if (fav.value && isInFav(row)) {
    fav.value = fav.value.filter((item) => item.name != row.name);
  }
}

function isInFav(row) {
  if (fav.value) {
    const index = fav.value.findIndex((item) => item.name === row.name)
    return index < 0 ? false : true
  }
  return false
}
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
