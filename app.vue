<template>
 <div>
  <a-select v-model:value="sel" :options="[
    {label:'a',value:'a'},
    {label:'b',value:'b'},
    {label:'c',value:'c'},
  ]" allowClear>
  </a-select>
 </div>
</template>


<script>

let sel = ref('')
</script>