<template>
    <div class="video-item" :class="wide ? 'item-wide' : ''">
        <iframe :src="getVideoUrl(data.id.videoId)" frameborder="0"></iframe>
        <div class="item-descriptions" :class="wide ? 'item-descriptions-wide' : ''">
            <h2 class="video-item-title">{{ shortTitle(data.snippet.title, 45) }}</h2>
            <h3 class="video-item-subtitle">{{ shortTitle(data.snippet.channelTitle, 30) }}</h3>
            <h3 class="video-item-subtitle">{{ shortView(view) || 0 }} просмотров</h3>
        </div>
    </div>
</template>
<script>
export default {
    props: ["data", "wide"],
    data() {
        return {
            view: 0
        }
    },
    async mounted() {
        return await this.$store.dispatch('GET_VIDEO_VIEW_COUNT', this.data?.id.videoId).then((el) => {
            this.view = el.viewCount
        })
    },
    methods: {
        shortTitle(str, length) {
            if (this.wide) return str
            if (str.length > length) {
                const str2 = str.slice(0, length)
                return str2 + '...'
            }
            return str
        },
        getVideoUrl(id) {
            return `https://www.youtube.com/embed/${id}`;
        },
        shortView(num) {
            let i = num.toString()
            if (i.length > 9) {
                let str = i
                const res = str.slice(0, i.length - 9)
                return `${res} млдр.`
            }
            if (i.length > 6) {
                let str = i
                const res = str.slice(0, i.length - 6)
                return `${res} млн.`
            }
            if (i.length > 4) {
                let str = i
                const res = str.slice(0, i.length - 3)
                return `${res} тыс.`
            }


            return i
        }

    },
}
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.video-item {
  max-width: 245px;
  width: 100%;
  margin-bottom: 28px;
  position: relative;

  iframe {
    max-width: 100%;
    width: auto;
    height: 137px;
    border: 1px solid $secondary;
    border-radius: 10px;
    background: $white;
    overflow: hidden;
    position: relative;
  }
}

.video-item-title {
  font-weight: bold;
  max-width: 100%;
  font-size: 14px;
  line-height: 16px;
  margin-top: 8px;
}

.video-item-subtitle {
  font-weight: 400;
  margin-top: 8px;
  font-size: 14px;
  line-height: 16px;
  color: $dark-blue;
}

.video-item.item-wide {
  max-width: 100%;
  display: flex;
}

.item-wide {
  .video-item-title {
    font-size: 16px;
    line-height: 20px;
    margin-top: 0;
  }

  .video-item-subtitle {
    font-size: 16px;
    line-height: 20px;
  }
}

.item-descriptions-wide {
  margin-left: 20px;
}
@media screen and (max-width: 1080px) {
  .video-item {
    max-width: 32%;

    iframe {
      height: 140px;
    }
  }
}

@media screen and (max-width: 768px) {
  .video-item {
    iframe {
      height: 120px;
    }
  }

  .video-item.item-wide {
    iframe {
      max-width: 35%;
    }
  }
}

@media screen and (max-width: 700px) {
  .video-item {
    iframe {
      height: 100px;
    }
  }

}

@media screen and (max-width: 600px) {
  .video-item {
    iframe {
      height: 80px;
    }
  }
}

@media screen and (max-width: 445px) {
  .video-item {
    max-width: 47%;

    iframe {
      height: 120px;
    }
  }

  .video-item-title {
    font-size: 14px;
    line-height: 16px;
  }
}

@media screen and (max-width: 390px) {
  .video-item {
    max-width: 100%;

    iframe {
      width: 100%;
      height: 170px;
    }
  }

  .video-item.item-wide {
    iframe {
      height: 72px;
    }
  }
}

</style>