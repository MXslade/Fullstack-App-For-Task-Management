package com.task.trello.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="card_tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Card card;

    @Column(name = "description")
    @Type(type="text")
    private String description;

    @Column(name = "date_added")
    private Date addedDate;

    @Column(name = "done")
    private boolean done;

}
