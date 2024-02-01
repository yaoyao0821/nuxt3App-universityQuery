<script setup>
const countries = getCountriesLocalStorage()
let country = useCountry()
let name = useName()

const searchRes = useSearchRes()
const baseURL = 'http://universities.hipolabs.com/search'
let startTime, endTime, responseTime = ref(0), responseCode = ref(200)

async function fetchData() {
    await useFetch(baseURL, {
        query: { country, name },
        onRequest({ request, options }) {
            startTime = (new Date()).getTime();
        },
        onRequestError({ request, options, error }) {
            console.error(`Request Error ${request}. Reason: ${error}.`)
        },
        onResponse({ request, response, options }) {
            searchRes.value = response?._data
            responseCode.value = response?.status
            endTime = (new Date()).getTime()
            responseTime.value = endTime - startTime
        },
        onResponseError({ request, response }) {
            console.error(`Response Error ${response}.`)
        },
        watch: [country, name]
    })
}

function clearAllFilter() {
    country.value = 'Canada'
    name.value = ''
}

await fetchData()

</script>

<template>
    <slot />
    <div>Response code is: {{ responseCode }} </div>
    <div>Response time is: {{ responseTime }} ms</div>
    <div>
        <UButton label="Clear All Filter" color="gray" variant="solid"
                        @click="clearAllFilter()"/>
    </div>
    <USelectMenu v-model="country" :options="countries" placeholder="Select countries" />
    <div>
        The country you choose is {{ country }} .
    </div>
    <UInput icon="i-heroicons-magnifying-glass-20-solid" color="white" variant="outline" placeholder="Search..." v-model="name"/>


</template>