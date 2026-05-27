package example.springbootdemo.controller;

import example.springbootdemo.entity.Book;
import example.springbootdemo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class BookController {

    //create book service
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/addBook")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = bookService.addBook(book);
        return ResponseEntity.ok(savedBook);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Book> getBookId(@PathVariable int id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/find/author/{author}")
    public ResponseEntity<Book> getBookAuthor(@PathVariable String author) {
        Book book = bookService.getBookByAuthor(author);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PutMapping("/updateBook")
    public ResponseEntity<Book> updateBook(@RequestBody Book book) {
        Book updateBook = bookService.updateBook(book);
        return ResponseEntity.ok(updateBook);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable("id") int id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }
}
