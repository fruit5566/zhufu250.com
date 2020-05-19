
var app = new Vue({
  el: '#app',
  data: {
    hostlist: [],
    bookmarks: [],
    recommendlist: [],
    dialog: false,
    recordmeta: {
      title: '',
      url: '',
      desc: ''
    },
    disabled: true,
    baseUrl: 'https://zhufu250.com/api'
  },
  methods: {
    cancel: function () {
      this.dialog = false
      this.recordmeta = {}
    },
    confirm: function () {
      axios.post(`${this.baseUrl}/bookmark`, this.recordmeta).then(res => {
        let meta = Object.assign({
          id: res.data.data.id
        }, this.recordmeta)
        meta.created_at = new Date().getTime()
        console.log(meta)
        this.bookmarks.unshift(meta)
        this.recordmeta = {}
        this.dialog = false
        this.disabled = true
      })
    },
    showdialog: function () {
      this.dialog = true
    },
    autoFetchTitle: function () {
      axios.get(`${this.baseUrl}/bookmark/title_desc?url=${this.recordmeta.url}`).then(res => {
        this.recordmeta.title = res.data.data.title
        this.recordmeta.desc = res.data.data.desc
        this.disabled = false
      })
    },
    pasteHandle: function (el) {
      setTimeout(() => {
        console.log(this.recordmeta.url)
        this.autoFetchTitle()
      }, 0)

    },
    imgError: function(el) {
      el.target.src = './favicon.png'
    },
    download: function() {
      getBlob(`${this.baseUrl}/download`).then((blob) => {
        console.log(blob)
        saveAs(blob, 'bookmark.html')
      })
    }
  }
})


axios.get(`${app.baseUrl}/hotnews`).then(res => {
  app.hostlist = res.data.data
})

axios.get(`${app.baseUrl}/bookmarks`).then(res => {
  app.bookmarks = res.data.data
})

axios.get(`${app.baseUrl}/recommends`).then(res => {
  app.recommendlist = res.data.data
})

const saveAs = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')

    link.href = window.URL.createObjectURL(blob) // 创建对象url
    link.download = filename

    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href) // 销毁 通过调用 URL.createObjectURL() 创建的 URL 对象
  }
}

const getBlob = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }

    xhr.send()
  })
}
