package com.csk.pahanaedu.controller;

import com.csk.pahanaedu.dto.ItemResponse;
import com.csk.pahanaedu.entity.Item;
import com.csk.pahanaedu.mapper.ItemMapper;
import com.csk.pahanaedu.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper itemMapper;

    //  Create Item
    @PostMapping
    public ResponseEntity<ItemResponse> create(
            @RequestParam("name") String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("price") double price,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            Item item = Item.builder()
                    .name(name)
                    .description(description)
                    .price(price)
                    .build();

            Item created = itemService.createItem(item);

            // Handle optional image
            if (file != null && !file.isEmpty()) {
                String filename = created.getId() + "_" + file.getOriginalFilename();
                Path uploadPath = Paths.get("./uploads/");
                if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                created.setImageUrl("/uploads/" + filename);
                created = itemService.updateItem(created.getId(), created);
            }

            return ResponseEntity.ok(itemMapper.toResponse(created));
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create item");
        }
    }

    //  Update Item
    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> update(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("price") double price,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            Item updatedItem = Item.builder()
                    .name(name)
                    .description(description)
                    .price(price)
                    .build();

            // Handle optional image
            if (file != null && !file.isEmpty()) {
                String filename = id + "_" + file.getOriginalFilename();
                Path uploadPath = Paths.get("./uploads/");
                if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                updatedItem.setImageUrl("/uploads/" + filename);
            }

            Item savedItem = itemService.updateItem(id, updatedItem);
            return ResponseEntity.ok(itemMapper.toResponse(savedItem));
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update item");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getById(@PathVariable String id) {
        Item item = itemService.getItemById(id);
        return ResponseEntity.ok(itemMapper.toResponse(item));
    }

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getAll() {
        List<Item> items = itemService.getAllItems();
        List<ItemResponse> responseList = items.stream()
                .map(itemMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }

    // Upload Image Separately
    @PostMapping("/{id}/upload-image")
    public ResponseEntity<ItemResponse> uploadImage(@PathVariable String id,
                                                    @RequestParam("file") MultipartFile file) {
        Item item = itemService.getItemById(id);
        try {
            String uploadsDir = "./uploads/";
            Path uploadPath = Paths.get(uploadsDir);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            String filename = id + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            item.setImageUrl("/uploads/" + filename);
            Item updatedItem = itemService.updateItem(id, item);

            return ResponseEntity.ok(itemMapper.toResponse(updatedItem));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
