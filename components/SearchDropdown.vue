<script setup>
const countriesList = useCountriesList()
let country = useCountry()
let name = useName()

const searchRes = useSearchRes()
const baseURL = 'http://universities.hipolabs.com/search'
let startTime, endTime, responseTime = ref(0), responseCode = ref(0)

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
countriesList.value = countriesList.value.length > 0 ? countriesList.value : await initCountriesList()
await fetchData()
</script>

<template>
    <div class="search-page-header">
        <UButton to="/favourites">Jump to Favourites Page</UButton>
        <UButton label="Clear All Filter" color="gray" variant="solid"
                        @click="clearAllFilter()"/>
    </div>

    <div class="search-page-performance">
        <div>Response code is: {{ responseCode ? responseCode :  'NA. Please choose country/name to search and get response code.' }} </div>
        <div>Response time is: {{ responseTime ? responseTime + 'ms' :  'NA. Please choose country/name to search and get response time.'}} </div>
    </div>

    <div class="search-page-selection">
        <span class="workbreak">Please choose a country. {{ country ? 'The country you choose is ' + country + '.' : ''}} </span>
        <USelectMenu class="search-page-dropdown"
                v-model="country" :options="countriesList" 
                placeholder="Select country" />
        <span class="workbreak">Please input an university name. {{ name ? 'The university you type is ' + name + '.' : '' }} </span>

        <UInput class="search-page-select"
                icon="i-heroicons-magnifying-glass-20-solid" 
                color="white" variant="outline" placeholder="Search..." 
                v-model="name"/>
    </div>
</template>