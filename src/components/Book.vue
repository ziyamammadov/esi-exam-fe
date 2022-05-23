<template>
  <div class="container">
    <header>
      <h3>{{ id ? "Edit book" : "Create book" }}</h3>
    </header>
    <div>
      <label>Author: </label>
      <input v-model="book.author" class="form-control" placeholder="Author" />
    </div>
    <div>
      <label>Title: </label>
      <input v-model="book.title" class="form-control" placeholder="Title" />
    </div>
    <div>
      <br>
      <form>
        <label>Current status: {{ this.book.status }}</label><br>
        <label for="statusList">Choose another status:</label>
        <select v-model="book.selectedStatus" name="statusList" id="statusList">
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="BOOKED">BOOKED</option>
          <option value="RENTED">RENTED</option>
          <option value="UNAVAILABLE">UNAVAILABLE</option>
        </select>
      </form>
    </div>
    <div>
      <label>Language: </label>
      <input v-model="book.language" class="form-control" placeholder="Language" />
    </div>
    <div>
      <button class="btn btn-primary btn-block mt-2" @click="saveBook()">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookService from "@/services/BookService";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Book extends Vue {
  @Auth.State("user")
  private currentUser!: any;
  private book = {
    id: "",
    author: "",
    title: "",
    status: "",
    selectedStatus: "",
    language: "",
  };

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.book.id = this.$route.params.id;
    if (this.book.id) {
      this.getBook();
    }
  }

  getBook() {
    BookService.getBook(this.book.id).then(
      (response) => {
        this.book.id = response.data.id
        this.book.author = response.data.author;
        this.book.title = response.data.title;
        this.book.status = response.data.status;
        this.book.selectedStatus = response.data.status;
        this.book.language = response.data.language;
      },
      (error) => {
        this.book =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }

  saveBook() {
    let newBook = {
      id: this.book.id,
      author: this.book.author,
      title: this.book.title,
      status: this.book.selectedStatus,
      language: this.book.language,
    }
    if (this.book.id) {
      BookService.editBook(newBook);
      this.$router.push("/books");
      this.$router.go(0);
    }
    else {
      BookService.createBook(newBook);
      this.$router.push("/books");
      this.$router.go(0);
    }
  }
}
</script>
