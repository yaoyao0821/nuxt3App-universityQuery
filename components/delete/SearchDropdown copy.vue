<script setup>
let country = ref('Canada')
const items = [
    [{
        label: 'Canada',
        slot: 'account',
    },{
        label: 'China',
        slot: 'account2',
    },{
        label: 'v@example.com',
        slot: 'account3',
        click: (item) => {
            console.log('ele', item)
        }
    }],
    // [{
    //     label: 'Settings',
    //     // icon: 'i-heroicons-cog-8-tooth'
    // }]
]


function chooseCountry (ele){
    console.log('ele',ele)
    country = ele

}


// const link = "http://universities.hipolabs.com/search?country=Canada"
const baseLink = 'http://universities.hipolabs.com/search'
async function fetchData() {
    const { data } = await useFetch(baseLink, {
        query: { country },
        onRequestError({ request, options, error }) {
            // 处理请求错误
        },
        onResponse({ request, response, options }) {
            console.log('test', request)
            // 处理响应数据
            //localStorage.setItem('token', response._data.token)
        },
        onResponseError({ request, response, options }) {
            // 处理响应错误
        }
    })
    console.log('data', data)
    // country = data
}

await fetchData()

// async function fetchData() {
//   todoData.value = null
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
//   )
//   todoData.value = await res.json()
// }

// const open = ref(true)

// defineShortcuts({
//   o: () => open.value = !open.value
// })

</script>

<template>
    <slot />
    <UDropdown  :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
    </UDropdown>

    <div>
        The country you choose is {{ country }} .
    </div>
</template>