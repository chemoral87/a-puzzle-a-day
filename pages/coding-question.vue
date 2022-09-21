<template>
  <div>
    <v-row dense>
      <v-col cols="auto">
        <v-text-field v-model.number="rows" label="Rows"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-text-field v-model.number="columns" label="Columns"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-text-field v-model.number="pixels" label="Pixels"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="generateBoard()" color="primary"> Generate </v-btn>
      </v-col>
      <!-- <span>
      The task, calculate the triangle coordinates for an image with right
      triangles such that for a given row (AF) and column (1-12) you can produce
      the layout below:
    </span> -->
    </v-row>
    <v-row>
      <v-col cols="12">
        <canvas id="c" :width="getWidth" :height="getHeight"></canvas>
      </v-col>
    </v-row>

    <v-text-field
      v-model="filterVertex"
      label="Filter Vertex Coordinates"
      placeholder="Ex (0,0) (10,0) (10,10)"
    ></v-text-field>
    <v-simple-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>vertexs</th>
          <th>row</th>
          <th>col</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="triangle in getFilterTriangles" :key="triangle.name">
          <td>{{ triangle.name }}</td>
          <td>{{ triangle.vertexs }}</td>
          <td>{{ triangle.row }}</td>
          <td>{{ triangle.col }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    {{ triangles }}
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      rows: 6,
      columns: 6,
      pixels: 10,
      vueCanvas: null,
      rectWidth: 10,
      triangles: [],
      filterVertex: '',
    }
  },
  computed: {
    getWidth() {
      let width = this.rows * (this.pixels + 1)
      return width
    },
    getHeight() {
      let height = this.columns * (this.pixels + 1)
      return height
    },
    getFilterTriangles() {
      let triangles_ = this.triangles
      try {
        let coords = this.filterVertex.trim().split(' ')
        let realCoords = []
        for (let coord of coords) {
          let pos = coord.trim().slice(1, -1).split(',')
          let x = pos[0].trim()
          let y = pos[1].trim()
          realCoords.push({ x, y })
        }
        console.log(realCoords)
      } catch (ex) {}
      // var pos_segs = pos.slice(1,-1).split(', ');
      // console.log(coord)
      return triangles_
    },
  },

  methods: {
    generateBoard() {
      this.buildTriangles()
      this.drawTrianglesOnCanvas()
    },
    drawTrianglesOnCanvas() {
      let ctx = this.vueCanvas
      ctx.clearRect(0, 0, 800, 800)

      for (let triangle of this.triangles) {
        let { vertexs } = triangle

        ctx.beginPath()
        for (let [ix, vertex] of vertexs.entries()) {
          let { x, y } = vertex
          if (ix == 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()

        // the outline
        ctx.lineWidth = 1
        ctx.strokeStyle = 'red'
        ctx.stroke()

        // the fill color
        ctx.fillStyle = '#FFCC00'
        ctx.fill()
      }
    },
    buildTriangles() {
      this.triangles = []

      let xPivot = 0
      let yPivot = 0
      let pixels = parseInt(this.pixels)
      for (var i = 0; i < this.rows; i++) {
        let count = 0
        let letter = String.fromCharCode(97 + i)
        for (var j = 0; j < this.columns; j++) {
          let triangle1 = {
            name: letter + ++count,
            row: i,
            col: j,
            vertexs: [
              { x: xPivot, y: yPivot },
              { x: xPivot, y: yPivot + pixels },
              { x: xPivot + pixels, y: yPivot + pixels },
            ],
          }
          this.triangles.push(triangle1)

          let triangle2 = {
            name: letter + ++count,
            row: i,
            col: j,
            vertexs: [
              { x: xPivot, y: yPivot },
              { x: xPivot + pixels, y: yPivot },
              { x: xPivot + pixels, y: yPivot + pixels },
            ],
          }
          this.triangles.push(triangle2)
          xPivot = xPivot + pixels + 1
        }
        xPivot = 0
        yPivot = yPivot + pixels + 1
      }
    },
  },
  mounted() {
    let me = this
    var c = document.getElementById('c')
    var ctx = c.getContext('2d')
    this.vueCanvas = ctx
  },
}
</script>
<style scoped>
#c {
  height: auto;
  width: auto;
  border: 1px solid gray;
}
</style>
