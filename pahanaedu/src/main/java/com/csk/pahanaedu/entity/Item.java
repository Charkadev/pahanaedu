package com.csk.pahanaedu.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    @Id
    private String id;

    private String name;
    private String description;
    private double price;

    private String imageUrl;
}
