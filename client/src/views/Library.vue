<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-three-fifths">
        <search-bar />

        <div class="library">
          <div class="card-scene">
            <Container
              orientation="horizontal"
              @drop="onColumnDrop($event)"
              drag-handle-selector=".column-drag-handle"
              @drag-start="dragStart"
              :drop-placeholder="upperDropPlaceholderOptions"
            >
              <Draggable v-for="column in scene.children" :key="column.id">
                <div :class="column.props.className">
                  <div class="card-column-header">
                    <span class="column-drag-handle">&#x2630;</span>
                    {{ column.name }}
                  </div>
                  <Container
                    group-name="col"
                    @drop="(e) => onCardDrop(column.id, e)"
                    @drag-start="(e) => log('drag start', e)"
                    @drag-end="(e) => log('drag end', e)"
                    :get-child-payload="getCardPayload(column.id)"
                    drag-class="card-ghost"
                    drop-class="card-ghost-drop"
                    :drop-placeholder="dropPlaceholderOptions"
                  >
                    <Draggable v-for="card in column.children" :key="card.id">
                      <div :class="card.props.className" :style="card.props.style">
                        <!-- <p>{{ card.img }}</p> -->
                        <img class="disable-interaction" :src="card.img" :title="card.title" />
                        <p>{{card.title}}</p>
                      </div>
                    </Draggable>
                  </Container>
                </div>
              </Draggable>
            </Container>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <AuthTestCheck />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AuthTestCheck from "@/components/authentication/AuthTestCheck.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import SearchBar from "@/components/SearchBar.vue";
import { generateItems, applyDrag, groupBy } from "../utils/helpers";

import Vue from "vue";
import { libraryGet, bookChangeState } from "../api/books";
import { SnackbarProgrammatic as Snackbar } from "buefy";

const columnNames = ["To Read", "Reading", "Read"];
const columnIds: { [id: string]: number } = {
  column0: 0,
  column1: 1,
  column2: 2
};
const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki"
];
const pickColor = () => {
  const rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

const scene = {
  type: "container",
  props: {
    orientation: "horizontal"
  },
  children: generateItems(3, (i: any) => ({
    id: `column${i}`,
    type: "container",
    name: columnNames[i],
    props: {
      orientation: "vertical",
      className: "card-container"
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, (j: any) => ({
      type: "draggable",
      id: `${i}${j}`,
      props: {
        className: "card",
        style: { backgroundColor: pickColor() }
      }
    }))
  }))
};

export default Vue.extend({
  name: "Library" as string,
  components: {
    AuthTestCheck,
    SearchBar,
    Container,
    Draggable
  },
  data() {
    return {
      scene,
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
  methods: {
    updateBookState(book: any, state: number) {
      bookChangeState(book.id, state);
      console.log("Try changing Book " + book.id + " => " + columnNames[state]);
      bookChangeState(book.id, state).then(res => {
        Snackbar.open({
          duration: 1800,
          message: book.title + " moved to " + columnNames[state],
          type: "is-success",
          position: "is-bottom"
        });
      });
    },
    onColumnDrop(dropResult: any) {
      console.log("DO IT");
      const scene = Object.assign({}, this.scene);
      scene.children = applyDrag(scene.children, dropResult);
      this.scene = scene;
    },
    onCardDrop(columnId: any, dropResult: any) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        if (dropResult.removedIndex === null) {
          // Update state
          this.updateBookState(
            dropResult.payload.book,
            columnIds[columnId] as number
          );
        }
        const scene = Object.assign({}, this.scene);
        const column = scene.children.filter((p: any) => p.id === columnId)[0];
        const columnIndex = scene.children.indexOf(column);
        const newColumn = Object.assign({}, column);
        newColumn.children = applyDrag(newColumn.children, dropResult);
        scene.children.splice(columnIndex, 1, newColumn);
        this.scene = scene;
      }
    },
    getCardPayload(columnId: any) {
      return (index: any) => {
        return this.scene.children.filter((p: any) => p.id === columnId)[0]
          .children[index];
      };
    },
    dragStart() {
      console.log("drag started");
    },
    log(...params: any) {
      // console.log(...params);
    },

    superUglyFixUp(tables: any) {
      for (let i = 0; i < 3; i++) {
        if (!tables[i]) {
          tables[i] = [];
        }
      }
    },
    init(data: any) {
      const tables = groupBy(data, "state");
      this.superUglyFixUp(tables);
      console.log(tables);

      const newScene = Object.assign({}, this.scene);
      newScene.children = generateItems(3, (i: any) => ({
        id: `column${i}`,
        type: "container",
        name: columnNames[i],
        props: {
          orientation: "vertical",
          className: "card-container"
        },
        children: generateItems(tables[i].length, (j: any) => ({
          type: "draggable",
          id: `${i}${j}`,
          props: {
            className: "card",
            style: { backgroundColor: pickColor() }
          },
          img: tables[i][j].__book__.imageLink,
          book: tables[i][j].__book__,
          title: tables[i][j].__book__.title
        }))
      }));

      this.scene = newScene;
    }
  },
  created() {
    console.log("INIT");
    libraryGet().then(res => {
      console.log(res.data);
      this.init(res.data);
    });
  }
});
</script>

<style lang="scss">
.library {
  margin-top: 80px;
}

.disable-interaction:hover {
  // Ugly activation of hover
  margin-top: 0px;
}
.disable-interaction:active {
  pointer-events: none;
}

.card-scene {
  padding: 50px;
  /* background-color: #fff; */
}

.card-container {
  width: 250px;
  padding: 10px;
  margin: 5px;
  margin-right: 45px;
  background-color: #f3f3f3;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
}

.card {
  margin: 5px;
  /* border: 1px solid #ccc; */
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  padding: 10px;
}

.card-column-header {
  font-size: 18px;
}

.column-drag-handle {
  cursor: move;
  padding: 5px;
}

.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}

.opacity-ghost {
  transition: all 0.18s ease;
  opacity: 0.8;
  /* transform: rotateZ(5deg); */
  background-color: cornflowerblue;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
  opacity: 1;
  /* transform: rotateZ(0deg); */
  background-color: white;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0);
}
</style>

