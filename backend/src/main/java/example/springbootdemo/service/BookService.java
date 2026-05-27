package example.springbootdemo.service;

import example.springbootdemo.entity.Book;
import example.springbootdemo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Entire Business logic
@Service
public class BookService {

    @Autowired  //field injection
    BookRepository bookRepository;

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book getBookById(int bid) {
        return bookRepository.findById(bid);
    }

    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }

    public Book getBookByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    //service -> respository -> database
}
