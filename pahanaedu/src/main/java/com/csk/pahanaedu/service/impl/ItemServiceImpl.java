package com.csk.pahanaedu.service.impl;

import com.csk.pahanaedu.entity.Item;
import com.csk.pahanaedu.repository.ItemRepository;
import com.csk.pahanaedu.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public Item createItem(Item item) {
        if (itemRepository.existsByName(item.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item with this name already exists");
        }
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(String id, Item updated) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setImageUrl(updated.getImageUrl());

        return itemRepository.save(existing);
    }

    @Override
    public void deleteItem(String id) {
        itemRepository.deleteById(id);
    }

    @Override
    public Item getItemById(String id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
