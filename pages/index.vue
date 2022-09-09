<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="10">
      <v-card>
        <v-card-title class="headline"> A Puzzle a Day </v-card-title>
        <v-card-text>
          <PuzzleBoard />
          <br />
          <Box />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <!-- <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
