package com.task.trello.repositories;

import com.task.trello.models.Card;
import com.task.trello.models.CardTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;


@Repository
@Transactional
public interface CardTaskRepository extends JpaRepository<CardTask, Long> {
    List<CardTask> findAllByCard(Card card);
}
