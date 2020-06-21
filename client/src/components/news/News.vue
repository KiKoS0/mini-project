<template>
  <div class="center">
    <div class="title title-left">News</div>
    <div>
      <div
        v-if="checkNewsList"
        class="news-container"
      >
        <div
          v-for="news in newsList"
          :key="news.id"
        >
          <NewsCard :news="news" />
        </div>
        <div v-if="canLoadMore">
          <LoadNews
            class="load-button"
            :loading="loading"
            @loadMoreNews="loadMoreNews"
          />
        </div>
      </div>
      <div v-else>
        <NoNewsCard />
      </div>
    </div>

    <hr
      v-if="!canLoadMore"
      style="height:2px;border-width:0;color:gray;background-color:gray"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getNews } from "../../api/news";
import NewsCard from "./NewsCard.vue";
import NoNewsCard from "./NoNewsCard.vue";
import LoadNews from "./LoadNews.vue";
import News from "../../models/news";

const newsNumberEachLoad = 10;
export default Vue.extend({
  name: "News",
  components: {
    NewsCard,
    NoNewsCard,
    LoadNews
  },
  data() {
    return {
      newsList: [] as News[], //eslint-disable-line
      page: 0 as number,
      canLoadMore: true as boolean,
      loading: false as boolean
    };
  },
  async created() {
    const { data } = await getNews(0);
    const { news } = data;
    if (news.length < newsNumberEachLoad) {
      this.canLoadMore = false;
    }
    this.newsList = news;
  },
  computed: {
    checkNewsList(): boolean {
      if (this.newsList.length === 0) return false;
      else return true;
    }
  },
  methods: {
    loadMoreNews() {
      this.loading = true;
      this.page++;
      getNews(this.page).then(({ data }) => {
        const { news } = data;
        if (news.length < newsNumberEachLoad) this.canLoadMore = false;
        this.newsList.push(...news);
        this.loading = false;

      });
    }
  }
});
</script>

<style lang="scss">
.title-left {
  text-align: left;
  margin-top: 20px;
  margin-left: 25px;
}

.news-container {
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: baseline;
}

.center {
  margin: auto;
}
.no-margin {
  margin: 0px;
}

.load-button {
  margin: auto;
  margin-bottom: 20px;
}
</style>
