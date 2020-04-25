<template>
  <div>
    <div class="container">
      <div class="list_col" v-for="(item, index) in testData" :key="index">
        <div class="list_col_item" v-for="(items, indexs) in item" :key="indexs">
          {{items}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
};
</script>

<style lang="stylus" scoped>
.card {
  padding: 10px;
}
</style>
