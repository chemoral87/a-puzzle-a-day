<template>
  <div>
    <div v-for="(piece, ix) in pieces" :key="ix">
      <table class="sample">
        <tr v-for="(row, iy) in piece.shape" :key="ix + iy">
          <td
            v-for="(cll, iz) in row"
            :key="ix + iy + iz"
            :style="{ backgroundColor: cll == 1 ? piece.color : '' }"
          >
            {{ cll == 1 ? piece.name : '' }}
          </td>
        </tr>
      </table>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      pieces: [
        {
          shape: [
            [1, 1, 0, 0],
            [0, 1, 1, 1],
          ],
          name: 'a',
          color: 'red',
        },
        {
          shape: [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
          ],
          name: 'b',
          color: 'blue',
        },
        {
          shape: [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
          ],
          name: 'c',
          color: 'green',
        },
        {
          shape: [
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 1],
          ],
          name: 'd',
          color: 'pink',
        },
        {
          shape: [
            [0, 1, 1],
            [1, 1, 1],
          ],
          name: 'e',
          color: 'orange',
        },
        {
          shape: [
            [0, 0, 1, 0],
            [1, 1, 1, 1],
          ],
          name: 'f',
          color: 'purple',
        },
        {
          shape: [
            [1, 0, 1],
            [1, 1, 1],
          ],
          name: 'g',
          color: 'violet',
        },
        {
          shape: [
            [0, 0, 0, 1],
            [1, 1, 1, 1],
          ],
          name: 'h',
          color: 'DarkTurquoise',
        },
      ],
    }
  },
  // https://htmlcolorcodes.com/es/nombres-de-los-colores/
  methods: {},
  mounted() {
    let me = this
  },
}
</script>
<style scoped>
table.sample {
  border-style: none;
  border-collapse: collapse;
}
table.sample th {
  border-width: 2px;
  width: 10px;
  height: 10px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
table.sample td {
  width: 32px;
  height: 32px;
  border-width: 0px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
</style>
