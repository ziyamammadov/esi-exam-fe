<template>
  <div class="container">
    <header class="jumbotron">
      <h3>List of all books</h3>
      <div class="input-group">
        <input @keyup.enter="loadBooks()" type="text" class="form-control" placeholder="Search" v-model="searchKey">
        <button @click="loadBooks()" class="input-group-text">&#x1F50E</button>
      </div>
    </header>
    <div id="books">
      <div>
        <router-link :to="'books/create'">
          <button class="btn btn-primary btn-block mb-3">
            ADD NEW BOOK
          </button>
        </router-link>
      </div>
      <div>

      </div>
      <table id="booksTable" class="table">
        <thead v-if="content">
          <tr>
            <th v-for="(value, key) in content[0]" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <p v-else>{{ error }}</p>
        <tbody>
          <tr v-for="book in content" :key="book.id">
            <td v-for="field in book" :key="field">
              {{ field }}
            </td>
            <td>
              <router-link :to="'books/edit/' + book.id"> Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookService from "@/services/BookService";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

class BookDto {

  id: number;
  author: string;
  title: string;
  status: string;
  selectedStatus: string;
  language: string;

  constructor(
    id: number,
    author: string,
    title: string,
    status: string,
    selectedStatus: string,
    language: string,
  ) {
    this.id = id
    this.author = author
    this.title = title
    this.status = status
    this.selectedStatus = selectedStatus
    this.language = language
  }

}

@Component
export default class Home extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  private content: BookDto[] = [];
  private error = null;
  private searchKey = "";

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.loadBooks();
  }

  loadBooks() {
    BookService.searchBooks(this.searchKey, 20, 0).then(
      (response) => {
        this.content = response.data.content;
        console.log(this.content)
      },
      (error) => this.extractErrorMessage(error)
    );
  }

  private extractErrorMessage(error: any) {
    this.error =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
  }
}
</script>
