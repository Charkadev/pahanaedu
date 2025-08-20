package com.csk.pahanaedu.repository;

import com.csk.pahanaedu.entity.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, String> {
    boolean existsByName(String name);
}
