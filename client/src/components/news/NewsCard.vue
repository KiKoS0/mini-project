<template>
  <div class="card news-card">
    <div class="card-content media">
      <div class=" media-left">
        <figure class="center image is-128x128">
          <img
            :src="news.img"
            alt="Books News"
          >
        </figure>
      </div>
      <div class="media-content">
        <div
          class="title is-5 clickable"
          @click="openNewsLink"
        >{{news.title}}</div>
        <div class="subtitle">{{news.description}}</div>
      </div>
    </div>
    <div class="card-footer flex-display ">
      <div class="source-left">{{news.source}}</div>
      <div class="time-right">{{news.publishedDate | formatDate | dashToMinus}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import News from '../../models/news'
export default Vue.extend({
  name: "NewsCard" as string,
  props: {
    "news":
      Object as PropType<News>
  },
  filters: {
    formatDate(date: string) {
      if (!date) return "";
      const timeStamp: number = Date.parse(date);
      const formattedDate: Date = new Date(timeStamp);
      return formattedDate.toLocaleDateString();
    },

    dashToMinus(date: string) {
      if (!date) return "";
      return date.split('/').join('-')
    }
  },
  methods: {
    openNewsLink() {
      window.open(this.news.link, "_blanc")
    }
  }
});
</script>

<style lang="scss">
.source-left {
  text-align: left;
}
.time-right {
  text-align: end;
}
.flex-display {
  justify-content: space-between;
}
.clickable:hover {
  text-decoration: underline;
  cursor: pointer;
}
.card .media:not(:last-child) {
  margin-bottom: 0px;
}
.news-card {
  margin-bottom: 15px;
  max-width: 590px !important;
  max-height: 300px !important;
  border-radius: 15px;
}
.card-footer {
  padding: 15px;
}
</style>