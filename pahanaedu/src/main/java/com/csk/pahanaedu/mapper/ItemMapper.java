package com.csk.pahanaedu.mapper;

import com.csk.pahanaedu.dto.ItemRequest;
import com.csk.pahanaedu.dto.ItemResponse;
import com.csk.pahanaedu.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {


    public Item toEntity(ItemRequest request, String id) {
        if (request == null) return null;
        return Item.builder()
                .id(id)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    // For creation (no id)
    public Item toEntity(ItemRequest request) {
        return toEntity(request, null);
    }

    public ItemResponse toResponse(Item item) {
        if (item == null) return null;
        return ItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .build();
    }
}
