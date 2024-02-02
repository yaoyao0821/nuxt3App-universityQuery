<script setup>

  const searchRes = useSearchRes()
  const columns = tableColumns
  const page = ref(1)
  const pageCount = 10

  const rows = computed(() => {
    return searchRes.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  })
</script>

<template>
    <div class="select-page-results">
      <UTable class="select-table" :columns="columns" :rows="rows">
        
        <template #actions-data="{ row }">
          <div v-if="isInFav(row)">
            <UButton label="Delete" color="black"
                        variant="solid"
                        @click="deleteInFav(row)"/>
          </div>
          <div v-else>
            <UButton label="Save" color="primary"
                        variant="solid"
                        @click="addInFav(row)"/>
          </div>
          
        </template>
      </UTable>
      <div class="pages">
        <UPagination v-model="page" :page-count="pageCount" :total="searchRes.length" />
      </div>
    </div>
</template>
