package com.csk.pahanaedu.service;

import com.csk.pahanaedu.entity.Item;

import java.util.List;

public interface ItemService {
    Item createItem(Item item);
    Item updateItem(String id, Item item);
    void deleteItem(String id);
    Item getItemById(String id);
    List<Item> getAllItems();
}
