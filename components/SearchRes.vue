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
  <span>
    <slot />
    test
    <div>
      <UTable :columns="columns" :rows="rows">
        
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
        <!-- <template #name-data="{ row }">
      <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
    </template> -->
      
      </UTable>
      <!-- <UTable :rows=searchRes /> -->

      <!-- {{ searchRes }} -->
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="searchRes.length" />
      </div>

    </div>
  </span>
</template>
