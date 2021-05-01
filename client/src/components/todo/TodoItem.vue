<template>
  <div class="todo-item">
    <input
      type="checkbox"
      class="checkbox"
      v-model="completed"
      :checked="completed"
      @change="editItemFinished"
    />
    <div
      v-if="!editing"
      :class="{ completed: completed }"
      class="title"
      @dblclick="editItemStart"
    >
      {{ todo.title }}
    </div>
    <input
      v-else
      type="text"
      class="edit-item"
      v-model="title"
      @keyup.enter="editItemFinished"
      @blur="editItemFinished"
      @keyup.escape="editItemCancelled"
      v-focus
    />
    <div class="remove-item" @click="removeItem">&#x2573;</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    selectAll: {
      type: Boolean,
      required:true,

    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed || this.selectAll,
      editing: this.todo.editing,
      cachedTitle: '',
    };
  },
  methods: {
    removeItem() {
      this.$emit('removedItem', {index:this.index, id:this.id });
    },
    editItemStart() {
      this.cachedTitle = this.title;
      this.editing = true;
    },

    editItemFinished() {
      if (this.title.trim() === '') {
        this.title = this.cachedTitle;
      }

      this.editing = false;
      this.$emit('editItemFinished', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
          cachedTitle :'',
        },
      });
    },

    editItemCancelled() {
        this.title = this.cachedTitle;
        this.editing = false
    }
  },
  watch: {
    selectAll() {
      if (this.selectAll) {
        this.completed = true;
      } else {
        this.completed = false;
      }
    }
  },
});
</script>

