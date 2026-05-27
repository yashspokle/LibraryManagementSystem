package example.springbootdemo.repository;

import example.springbootdemo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    public Book findById(int bid);

    public Book findByAuthor(String author);
}
